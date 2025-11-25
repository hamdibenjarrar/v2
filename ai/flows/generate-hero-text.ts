'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating hero section text options based on a brief description of Wallah We Can's mission.
 *
 * - generateHeroText - A function that generates compelling and persuasive hero section text options.
 * - GenerateHeroTextInput - The input type for the generateHeroText function.
 * - GenerateHeroTextOutput - The return type for the generateHeroText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHeroTextInputSchema = z.object({
  missionDescription: z
    .string()
    .describe("A brief description of Wallah We Can's mission and goals."),
});
export type GenerateHeroTextInput = z.infer<typeof GenerateHeroTextInputSchema>;

const GenerateHeroTextOutputSchema = z.object({
  title: z.string().describe('The main title for the hero section.'),
  subtitle: z.string().describe('A compelling subtitle for the hero section.'),
  callToAction: z.string().describe('A persuasive call to action for the hero section.'),
});
export type GenerateHeroTextOutput = z.infer<typeof GenerateHeroTextOutputSchema>;

export async function generateHeroText(input: GenerateHeroTextInput): Promise<GenerateHeroTextOutput> {
  return generateHeroTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHeroTextPrompt',
  input: {schema: GenerateHeroTextInputSchema},
  output: {schema: GenerateHeroTextOutputSchema},
  prompt: `You are a marketing expert specializing in non-profit organizations. Generate compelling and persuasive hero section text options for Wallah We Can based on their mission description.  Provide a title, subtitle, and call to action.

Mission Description: {{{missionDescription}}}

Respond in JSON format.`,  
});

const generateHeroTextFlow = ai.defineFlow(
  {
    name: 'generateHeroTextFlow',
    inputSchema: GenerateHeroTextInputSchema,
    outputSchema: GenerateHeroTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
