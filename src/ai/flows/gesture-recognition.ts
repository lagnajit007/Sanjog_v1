'use server';
/**
 * @fileOverview A Genkit flow for recognizing sign language gestures.
 *
 * This flow takes hand landmarks, sends them to a Python model for prediction,
 * and returns the recognized gesture.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { exec } from 'child_process';
import path from 'path';
import util from 'util';

const execPromise = util.promisify(exec);

// Define the input schema for the gesture recognition flow
const GestureRecognitionInputSchema = z.object({
  landmarks: z.array(z.number()).describe('A flat array of 42 hand landmark coordinates (21 x,y pairs).'),
});
export type GestureRecognitionInput = z.infer<typeof GestureRecognitionInputSchema>;

// Define the output schema for the gesture recognition flow
const GestureRecognitionOutputSchema = z.object({
  prediction: z.string().describe('The predicted sign language gesture (e.g., "A", "B", "Hello").'),
  confidence: z.number().describe('The confidence score of the prediction (0-1).'),
});
export type GestureRecognitionOutput = z.infer<typeof GestureRecognitionOutputSchema>;

// Define the main flow for gesture recognition
const recognizeGestureFlow = ai.defineFlow(
  {
    name: 'recognizeGestureFlow',
    inputSchema: GestureRecognitionInputSchema,
    outputSchema: GestureRecognitionOutputSchema,
  },
  async (input) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ landmarks: input.landmarks }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Prediction server error:', errorText);
        return {
          prediction: 'error',
          confidence: 0,
        };
      }

      const result = await response.json();
      return {
        prediction: result.prediction,
        confidence: result.confidence,
      };
    } catch (error) {
      console.error("Error communicating with prediction server:", error);
      return {
        prediction: 'error',
        confidence: 0,
      };
    }
  }
);

// Export a wrapper function for client-side use
export async function recognizeGesture(input: GestureRecognitionInput): Promise<GestureRecognitionOutput> {
  return await recognizeGestureFlow(input);
}