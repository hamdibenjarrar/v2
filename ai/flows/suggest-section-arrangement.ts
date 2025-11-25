'use server';

/**
 * @fileOverview A flow that suggests the optimal arrangement and transition effects between website sections.
 *
 * - suggestSectionArrangement - A function that handles the section arrangement suggestion process.
 * - SuggestSectionArrangementInput - The input type for the suggestSectionArrangement function.
 * - SuggestSectionArrangementOutput - The return type for the suggestSectionArrangement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSectionArrangementInputSchema = z.object({
  sections: z
    .array(z.string())
    .describe('An array of section names to arrange on the website.'),
  brandIdentity: z
    .string()
    .describe(
      'A description of the brand identity, including colors and overall aesthetic.'
    ),
});
export type SuggestSectionArrangementInput = z.infer<
  typeof SuggestSectionArrangementInputSchema
>;

const SuggestSectionArrangementOutputSchema = z.object({
  arrangement: z
    .array(z.string())
    .describe('The suggested order of the sections.'),
  transitionEffects: z
    .array(z.string())
    .describe(
      'Suggested transition effects between each section, using Framer Motion and GSAP.'
    ),
  rationale: z
    .string()
    .describe(
      'Explanation of why each section has this arrangement and transition.'
    ),
});
export type SuggestSectionArrangementOutput = z.infer<
  typeof SuggestSectionArrangementOutputSchema
>;

export async function suggestSectionArrangement(
  input: SuggestSectionArrangementInput
): Promise<SuggestSectionArrangementOutput> {
  return suggestSectionArrangementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSectionArrangementPrompt',
  input: {schema: SuggestSectionArrangementInputSchema},
  output: {schema: SuggestSectionArrangementOutputSchema},
  prompt: `You are an expert web designer specializing in creating engaging website layouts for NGOs.

You will receive a list of website sections and a description of the brand identity.
Your goal is to suggest the optimal arrangement of these sections and transition effects between them to create a visually appealing and effective user experience.

Sections: {{{sections}}}
Brand Identity: {{{brandIdentity}}}

Output:
- arrangement (array of section names in the suggested order)
- transitionEffects (array of transition effect descriptions using Framer Motion and GSAP)
- rationale (explanation of why each section has this arrangement and transition).

Ensure that the arrangement is logical and flows smoothly, considering the NGO's mission to highlight education, empowerment, sustainability, and innovation.
`,
});

const suggestSectionArrangementFlow = ai.defineFlow(
  {
    name: 'suggestSectionArrangementFlow',
    inputSchema: SuggestSectionArrangementInputSchema,
    outputSchema: SuggestSectionArrangementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
