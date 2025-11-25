
'use server';

import { z } from 'zod';
import { randomBytes } from 'crypto';
import { createClient } from '@/lib/supabase/server';

export const RequestAccessInputSchema = z.object({
  email: z.string().email().describe('The email address of the user requesting access.'),
});
export type RequestAccessInput = z.infer<typeof RequestAccessInputSchema>;

export const RequestAccessOutputSchema = z.object({
  status: z.enum(['success', 'exists', 'error']),
  message: z.string(),
});
export type RequestAccessOutput = z.infer<typeof RequestAccessOutputSchema>;

function generatePassword(length = 8) {
  return randomBytes(length).toString('hex').slice(0, length);
}

export async function requestDocumentAccess(input: RequestAccessInput): Promise<RequestAccessOutput> {
   try {
      const supabase = createClient();
      const requestsTable = 'document_access_requests';
      const usersTable = 'document_users';

      // Check if user is already approved
      const { data: existingUser } = await supabase
        .from(usersTable)
        .select('email')
        .eq('email', input.email)
        .single();
      
      if (existingUser) {
        return { status: 'exists', message: 'Access has already been granted to this email.' };
      }
      
      // Check if a request already exists
      const { data: existingRequest } = await supabase
        .from(requestsTable)
        .select('email')
        .eq('email', input.email)
        .single();
        
      if (existingRequest) {
        return { status: 'exists', message: 'An access request for this email already exists.' };
      }
      
      // Generate a unique password
      const password = generatePassword();

      // Create a new request
      const { error: insertError } = await supabase.from(requestsTable).insert({
        email: input.email,
        password: password,
        status: 'pending',
      });

      if (insertError) {
          console.error('Error inserting new request:', insertError);
          throw new Error(insertError.message);
      }

      return { status: 'success', message: 'Your request has been submitted for approval.' };
    } catch (error) {
      console.error("Error in requestDocumentAccess: ", error);
      return { status: 'error', message: (error as Error).message || 'An unknown error occurred.' };
    }
}
