import { useEffect } from "react";
import supabase from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { useIsSessionLoaded, useSession, useSetSession } from "@/store/session";
import GlobalLoader from "@/components/global-loader";
import { useProfileData } from "@/hooks/queries/useProfileData";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  const { data: profile, isLoading: isProfileLoading } = useProfileData();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as Session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;
  if (isProfileLoading) return <GlobalLoader />;

  return children;
}
