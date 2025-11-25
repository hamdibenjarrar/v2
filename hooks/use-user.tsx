"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

type UserContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider = (props: UserContextProviderProps) => {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        const { data: claims, error } = await supabase.rpc('get_my_claims');
        if (error) console.error('Error getting claims', error);
        else setIsAdmin(claims?.user_role === 'admin');
      } else {
        setIsAdmin(false);
      }
      setIsLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
         if (session?.user) {
          const { data: claims, error } = await supabase.rpc('get_my_claims');
          if (error) console.error('Error getting claims', error);
          else setIsAdmin(claims?.user_role === 'admin');
        } else {
          setIsAdmin(false);
        }
        setIsLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const value = {
    session,
    user,
    isLoading,
    isAdmin
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
