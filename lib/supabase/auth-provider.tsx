// lib/supabase/auth-provider.tsx
'use client';

import { createContext, useContext } from 'react';
import { createClient } from './client';
import { UserContextProvider } from '@/hooks/use-user';

const SupabaseContext = createContext<ReturnType<typeof createClient> | null>(
  null
);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  return (
    <SupabaseContext.Provider value={supabase}>
      <UserContextProvider>{children}</UserContextProvider>
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }

  return context;
};
