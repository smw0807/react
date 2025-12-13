import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSignInWithPassword } from "@/hooks/mutations/auth/useSignInWithPassword";
import { useSignInWithOAuth } from "@/hooks/mutations/auth/useSignInWithOAuth";

import githubLogo from "@/assets/github-mark.svg";
import { generateErrorMessage } from "@/lib/error";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      onSuccess: () => {
        toast.success("로그인 성공", {
          position: "top-center",
        });
      },
      onError: (error) => {
        const errorMessage = generateErrorMessage(error);
        toast.error(errorMessage, {
          position: "top-center",
        });
        setPassword("");
      },
    });
  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignInWithOAuth({
      onError(error) {
        const errorMessage = generateErrorMessage(error);
        toast.error(errorMessage, {
          position: "top-center",
        });
      },
    });

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;
    signInWithPassword({ email, password });
  };

  const handleSignInWithGitHubClick = () => {
    signInWithOAuth("github");
  };

  const handleSignInWithGoogleClick = () => {
    signInWithOAuth("google");
  };

  const isPending = isSignInWithPasswordPending || isSignInWithOAuthPending;

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@abc.com"
          disabled={isPending}
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
          disabled={isPending}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          className="w-full"
          onClick={handleSignInWithPasswordClick}
          disabled={isPending}
        >
          로그인
        </Button>
        <Button
          className="w-full"
          variant={"outline"}
          onClick={handleSignInWithGitHubClick}
          disabled={isPending}
        >
          <img src={githubLogo} alt="GitHub" className="h-4 w-4" />
          GitHub 게정으로 로그인
        </Button>
        <Button
          className="w-full"
          variant={"outline"}
          onClick={handleSignInWithGoogleClick}
          disabled={isPending}
        >
          Google 게정으로 로그인
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Link className="text-muted-foreground hover:underline" to="/sign-up">
          아직 계정이 없으신가요? 회원가입
        </Link>
        <Link
          className="text-muted-foreground hover:underline"
          to="/forget-password"
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </div>
  );
}
