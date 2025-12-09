import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdatePassword } from "@/hooks/mutations/useUpdatePassword";
import { generateErrorMessage } from "@/lib/error";
import { useNavigate } from "react-router";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: updatePassword, isPending: isUpdatingPasswordPending } =
    useUpdatePassword({
      onSuccess: () => {
        toast.success("비밀번호가 성공적으로 변경되었습니다.", {
          position: "top-center",
        });
        navigate("/");
      },
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });
        setPassword("");
        setConfirmPassword("");
      },
    });

  const handleUpdatePasswordClick = () => {
    if (password.trim() === "") return;
    if (confirmPassword.trim() === "") return;
    if (password !== confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다.", {
        position: "top-center",
      });
      return;
    }
    updatePassword(password);
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">비밀번호 재설정하기</div>
        <div className="text-muted-foreground">
          새로운 비밀번호를 입력해주세요.
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          type="password"
          className="py-6"
          placeholder="new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isUpdatingPasswordPending}
        />
        <Input
          type="password"
          className="py-6"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isUpdatingPasswordPending}
        />
      </div>
      <Button
        disabled={isUpdatingPasswordPending}
        className="w-full"
        onClick={handleUpdatePasswordClick}
      >
        비밀번호 변경하기
      </Button>
    </div>
  );
}
