'use server';
/**
 * @fileOverview A Genkit flow for recognizing sign language gestures.
 *
 * This flow takes hand landmarks, sends them to a Python model for prediction,
 * and returns the recognized gesture.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { defineTool } from 'genkit/tool';
import { exec } from 'child_process';
import path from 'path';

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
const pythonPredictionTool = defineTool(
  {
    name: 'gesturePredictor',
    description: 'Runs a Python script to predict a sign language gesture from hand landmarks.',
    input: { schema: GestureRecognitionInputSchema },
    output: { schema: GestureRecognitionOutputSchema },
  },
  async (input) => {
    // This is a simplified example of invoking a Python script.
    // In a real-world scenario, you would have a long-running server
    // and make an HTTP request to it.
    
    // For this example, we'll execute the Python script as a one-off process.
    // This is not efficient for real-time use but demonstrates the concept.
    const pythonScriptPath = path.resolve(process.cwd(), 'src/models/predict_server.py');
    const modelPath = path.resolve(process.cwd(), 'src/models/model.p');
    
    // We'll pass landmarks as a JSON string argument to the script.
    const landmarksJson = JSON.stringify(input.landmarks);

    // In a real application, you would manage this server process more robustly.
    // For now, we simulate a request/response by running the script.
    // This is a placeholder for an actual HTTP request to a running Flask server.
    
    // For now, let's return a mocked response.
    // Replace this with actual prediction logic when the backend is ready.
    const mockPrediction = () => {
      const signs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const randomSign = signs[Math.floor(Math.random() * signs.length)];
      if (input.landmarks.length === 42) {
          if (Math.random() > 0.3) {
            return {
                prediction: 'A',
                confidence: Math.random() * 0.3 + 0.7, // 70-100%
            };
          }
          return {
            prediction: randomSign,
            confidence: Math.random(),
          };
      }
      return {
        prediction: 'unknown',
        confidence: 0,
      }
    };
    
    return mockPrediction();
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
    const predictionResult = await pythonPredictionTool.run({ landmarks: input.landmarks });
    
    return predictionResult;
  }
);

// Export a wrapper function for client-side use
export async function recognizeGesture(input: GestureRecognitionInput): Promise<GestureRecognitionOutput> {
  return recognizeGestureFlow(input);
}
