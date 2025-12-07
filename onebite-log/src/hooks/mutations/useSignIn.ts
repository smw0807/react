import { signIn } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
  });
}
