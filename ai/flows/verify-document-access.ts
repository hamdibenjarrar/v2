'use server';

/**
 * @fileOverview A server action to verify a user's credentials for document access.
 */

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

export const VerifyAccessInputSchema = z.object({
  email: z.string().email().describe('The user\'s email address.'),
  password: z.string().describe('The password provided to the user.'),
});
export type VerifyAccessInput = z.infer<typeof VerifyAccessInputSchema>;

export const VerifyAccessOutputSchema = z.object({
  status: z.enum(['success', 'failure']),
  message: z.string(),
});
export type VerifyAccessOutput = z.infer<typeof VerifyAccessOutputSchema>;


export async function verifyDocumentAccess(input: VerifyAccessInput): Promise<VerifyAccessOutput> {
    try {
      const supabase = createClient();
      const usersTable = 'document_users';
      
      // Query for a user with the matching email and password
      const { data: user, error } = await supabase
        .from(usersTable)
        .select('email')
        .eq('email', input.email)
        .eq('password', input.password)
        .single();

      if (error || !user) {
        if (error && error.code !== 'PGRST116') {
             console.error("Error verifying user:", error);
        }
        // No user found with the provided credentials
        return { status: 'failure', message: 'Invalid email or password. Please check your credentials or request access.' };
      }

      return { status: 'success', message: 'Access granted.' };

    } catch (error) {
      console.error("Error in verifyDocumentAccess: ", error);
      return { status: 'failure', message: (error as Error).message || 'An unknown error occurred.' };
    }
}
