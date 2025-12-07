import { useState } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSignUp } from "@/hooks/mutations/useSignUp";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signUp, isPending: isSigningUpPending } = useSignUp({
    onSuccess: () => {
      toast.success("회원가입 성공", {
        position: "top-center",
      });
      setEmail("");
      setPassword("");
    },
    onError: (error) => {
      const errorMessage = generateErrorMessage(error);
      toast.error(errorMessage, {
        position: "top-center",
      });
    },
  });

  const handleSignUpClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;
    signUp({ email, password });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">회원가입</div>
      <div className="flex flex-col gap-2">
        <Input
          value={email}
          disabled={isSigningUpPending}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@abc.com"
        />
        <Input
          value={password}
          disabled={isSigningUpPending}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
        />
      </div>
      <div>
        <Button
          className="w-full"
          onClick={handleSignUpClick}
          disabled={isSigningUpPending}
        >
          회원가입
        </Button>
      </div>
      <div>
        <Link className="text-muted-foreground hover:underline" to="/sign-in">
          이미 계정이 있다면? 로그인
        </Link>
      </div>
    </div>
  );
}
