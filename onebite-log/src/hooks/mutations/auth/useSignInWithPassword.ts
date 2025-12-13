import { signIn } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import type { UseMutationCallback } from "@/types";

export function useSignInWithPassword(callback?: UseMutationCallback) {
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      if (callback?.onSuccess) {
        callback.onSuccess();
      }
    },
    onError: (error) => {
      console.error(error);
      if (callback?.onError) {
        callback.onError(error);
      }
    },
  });
}
