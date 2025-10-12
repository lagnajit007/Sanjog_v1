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

// Define the tool to run the Python prediction server
const pythonPredictionTool = ai.defineTool(
  {
    name: 'gesturePredictor',
    description: 'Runs a Python script to predict a sign language gesture from hand landmarks.',
    inputSchema: GestureRecognitionInputSchema,
    outputSchema: GestureRecognitionOutputSchema,
  },
  async (input) => {
    const pythonScriptPath = path.resolve(process.cwd(), 'src/models/predict_server.py');
    const modelPath = path.resolve(process.cwd(), 'src/models/model.p');
    
    // Pass landmarks as a JSON string argument to the script.
    const landmarksJsonString = JSON.stringify(input.landmarks);

    // Escape single quotes in the JSON string for shell command
    const escapedLandmarks = landmarksJsonString.replace(/'/g, "'\\''");

    try {
      const { stdout } = await execPromise(`python3 ${pythonScriptPath} '${escapedLandmarks}'`, {
          env: { ...process.env, MODEL_PATH: modelPath }
      });
      const result = JSON.parse(stdout);

      if (result.error) {
        console.error('Python script error:', result.error);
        return {
          prediction: 'unknown',
          confidence: 0,
        };
      }
      
      return {
        prediction: result.prediction,
        confidence: result.confidence,
      };

    } catch (error) {
      console.error("Error executing Python script:", error);
      return {
        prediction: 'error',
        confidence: 0,
      };
    }
  }
);

// Define the main flow for gesture recognition
const recognizeGestureFlow = ai.defineFlow(
  {
    name: 'recognizeGestureFlow',
    inputSchema: GestureRecognitionInputSchema,
    outputSchema: GestureRecognitionOutputSchema,
  },
  async (input) => {
    // Call the Python prediction tool
    const result = await pythonPredictionTool(input);
    return result;
  }
);

// Export a wrapper function for client-side use
export async function recognizeGesture(input: GestureRecognitionInput): Promise<GestureRecognitionOutput> {
  return await recognizeGestureFlow(input);
}
