import { signInWithOAuth } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import type { UseMutationCallback } from "@/types";

export function useSignInWithOAuth(callback?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithOAuth,
    onError: (error) => {
      if (callback?.onError) callback.onError(error);
    },
  });
}
