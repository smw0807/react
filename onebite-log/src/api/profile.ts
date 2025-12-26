import supabase from "@/lib/supabase";
import { getRandomNickname } from "@/lib/utils";
import { deleteImagesInPath, uploadImage } from "./image";

export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function createProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .insert({
      id: userId,
      nickname: getRandomNickname(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile({
  userId,
  nickname,
  bio,
  avatarImageFIle,
}: {
  userId: string;
  nickname?: string;
  bio?: string;
  avatarImageFIle?: File;
}) {
  // 1. 기존 아바타 이미지 삭제
  if (avatarImageFIle) {
    await deleteImagesInPath(`${userId}/avatar`);
  }
  // 2. 새로운 아바타 이미지 업로드
  let newAvatarUrl = null;
  if (avatarImageFIle) {
    const fileExtension = avatarImageFIle.name.split(".").pop() || "webp";
    const filePath = `${userId}/avatar/${new Date().getTime()}-${crypto.randomUUID()}.${fileExtension}`;
    newAvatarUrl = await uploadImage({
      file: avatarImageFIle,
      filePath,
    });
  }
  // 3. 프로필 테이블 업데이트
  const { data, error } = await supabase
    .from("profile")
    .update({
      nickname,
      bio,
      avatar_url: newAvatarUrl,
    })
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}
