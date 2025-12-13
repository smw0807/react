import { signUp } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import type { UseMutationCallback } from "@/types";

export function useSignUp(callback?: UseMutationCallback) {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      if (callback?.onSuccess) callback.onSuccess();
    },
    onError: (error) => {
      if (callback?.onError) callback.onError(error);
    },
  });
}
