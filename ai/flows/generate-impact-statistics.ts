'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating impact statistics summaries.
 *
 * - generateImpactStatistics - An async function that takes input and returns impact statistics.
 * - GenerateImpactStatisticsInput - The input type for the generateImpactStatistics function.
 * - GenerateImpactStatisticsOutput - The output type for the generateImpactStatistics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImpactStatisticsInputSchema = z.object({
  audience: z.string().describe('The target audience for the impact statistics summary.'),
  achievements: z.array(z.string()).describe('A list of achievements with numerical data.'),
});
export type GenerateImpactStatisticsInput = z.infer<
  typeof GenerateImpactStatisticsInputSchema
>;

const GenerateImpactStatisticsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A compelling summary of the impact statistics tailored for the specified audience.'
    ),
});

export type GenerateImpactStatisticsOutput = z.infer<
  typeof GenerateImpactStatisticsOutputSchema
>;

export async function generateImpactStatistics(
  input: GenerateImpactStatisticsInput
): Promise<GenerateImpactStatisticsOutput> {
  return generateImpactStatisticsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImpactStatisticsPrompt',
  input: {schema: GenerateImpactStatisticsInputSchema},
  output: {schema: GenerateImpactStatisticsOutputSchema},
  prompt: `You are an expert marketing manager specializing in creating targeted content for social media and reports.

You will use the following achievements to generate a compelling impact statistics summary tailored for the specified audience.

Audience: {{{audience}}}
Achievements: {{#each achievements}}{{{this}}}\n{{/each}}

Summary: `,
});

const generateImpactStatisticsFlow = ai.defineFlow(
  {
    name: 'generateImpactStatisticsFlow',
    inputSchema: GenerateImpactStatisticsInputSchema,
    outputSchema: GenerateImpactStatisticsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
