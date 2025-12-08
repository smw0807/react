import { useEffect } from "react";
import supabase from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { useIsSessionLoaded, useSetSession } from "@/store/session";
import GlobalLoader from "@/components/global-loader";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as Session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;

  return children;
}
