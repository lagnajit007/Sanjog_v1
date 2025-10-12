'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized feedback on sign language performance.
 *
 * The flow takes video data of a user signing and returns feedback on their accuracy.
 *
 * - personalizedLessonFeedback - A function that handles the feedback process.
 * - PersonalizedLessonFeedbackInput - The input type for the personalizedLessonFeedback function.
 * - PersonalizedLessonFeedbackOutput - The return type for the personalizedLessonFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLessonFeedbackInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video of the user performing a sign, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  expectedSign: z.string().describe('The sign the user is expected to perform.'),
});
export type PersonalizedLessonFeedbackInput = z.infer<
  typeof PersonalizedLessonFeedbackInputSchema
>;

const PersonalizedLessonFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Personalized feedback on the user\'s sign language performance.'),
  accuracyScore: z.number().describe('A score indicating the accuracy of the sign, from 0 to 1.'),
});
export type PersonalizedLessonFeedbackOutput = z.infer<
  typeof PersonalizedLessonFeedbackOutputSchema
>;

export async function personalizedLessonFeedback(
  input: PersonalizedLessonFeedbackInput
): Promise<PersonalizedLessonFeedbackOutput> {
  return personalizedLessonFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedLessonFeedbackPrompt',
  input: {schema: PersonalizedLessonFeedbackInputSchema},
  output: {schema: PersonalizedLessonFeedbackOutputSchema},
  prompt: `You are an AI sign language tutor providing personalized feedback to students.

You will receive a video of the student performing a sign and the sign they were expected to perform.

Analyze the video and provide specific feedback on their form, including areas for improvement.
Also, provide an accuracy score from 0 to 1.

Video: {{media url=videoDataUri}}
Expected Sign: {{{expectedSign}}}`,
});

const personalizedLessonFeedbackFlow = ai.defineFlow(
  {
    name: 'personalizedLessonFeedbackFlow',
    inputSchema: PersonalizedLessonFeedbackInputSchema,
    outputSchema: PersonalizedLessonFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
