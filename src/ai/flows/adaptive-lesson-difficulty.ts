'use server';

/**
 * @fileOverview A flow that dynamically adjusts the difficulty of sign language lessons based on user performance.
 *
 * - adaptLessonDifficulty - A function that adjusts lesson difficulty based on user performance data.
 * - AdaptLessonDifficultyInput - The input type for the adaptLessonDifficulty function.
 * - AdaptLessonDifficultyOutput - The return type for the adaptLessonDifficulty function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptLessonDifficultyInputSchema = z.object({
  userId: z.string().describe('The unique identifier of the user.'),
  lessonId: z.string().describe('The unique identifier of the lesson.'),
  performanceData: z.object({
    accuracy: z.number().describe('The accuracy of the user in the lesson (0-1).'),
    completionTime: z
      .number()
      .describe('The time taken by the user to complete the lesson in seconds.'),
    hintsUsed: z.number().describe('The number of hints used by the user during the lesson.'),
  }),
});
export type AdaptLessonDifficultyInput = z.infer<typeof AdaptLessonDifficultyInputSchema>;

const AdaptLessonDifficultyOutputSchema = z.object({
  adjustedDifficulty: z
    .string()
    .describe(
      'The adjusted difficulty level for the next lesson (e.g., beginner, intermediate, advanced).' ),
  feedbackMessage: z.string().describe('Personalized feedback message for the user.'),
});
export type AdaptLessonDifficultyOutput = z.infer<typeof AdaptLessonDifficultyOutputSchema>;

export async function adaptLessonDifficulty(
  input: AdaptLessonDifficultyInput
): Promise<AdaptLessonDifficultyOutput> {
  return adaptLessonDifficultyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptLessonDifficultyPrompt',
  input: {schema: AdaptLessonDifficultyInputSchema},
  output: {schema: AdaptLessonDifficultyOutputSchema},
  prompt: `You are an AI-powered sign language learning assistant. Your task is to analyze user performance data from a recent lesson and adjust the difficulty level for the next lesson, as well as provide a feedback message to encourage the user.

User ID: {{{userId}}}
Lesson ID: {{{lessonId}}}
Accuracy: {{{performanceData.accuracy}}}
Completion Time: {{{performanceData.completionTime}}} seconds
Hints Used: {{{performanceData.hintsUsed}}}

Based on this data, determine whether the user is ready for a more challenging lesson, needs to repeat the current lesson, or should be given an easier lesson. Set the adjustedDifficulty field to one of the following values: beginner, intermediate, advanced.

Also, create a short, encouraging feedback message for the user that is tailored to their performance. This message should be no more than one sentence.

Consider these factors when setting difficulty:
- High accuracy, short completion time, and few hints used indicate the user is ready for a more challenging lesson.
- Low accuracy, long completion time, and many hints used indicate the user needs an easier lesson or to repeat the current lesson.
- Moderate accuracy, moderate completion time, and some hints used indicate the user is at the right level.

Ensure the adjustedDifficulty and feedbackMessage fields are appropriately set based on the user's performance.`, // eslint-disable-line max-len
});

const adaptLessonDifficultyFlow = ai.defineFlow(
  {
    name: 'adaptLessonDifficultyFlow',
    inputSchema: AdaptLessonDifficultyInputSchema,
    outputSchema: AdaptLessonDifficultyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
