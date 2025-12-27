import { type Database } from "@/database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];
export type PostInsert = Database["public"]["Tables"]["post"]["Insert"];
export type PostUpdate = Database["public"]["Tables"]["post"]["Update"];

export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profile"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profile"]["Update"];

export type Post = PostEntity & { author: ProfileEntity; isLiked: boolean };

export type CommentEntity = Database["public"]["Tables"]["comment"]["Row"];
export type CommentInsert = Database["public"]["Tables"]["comment"]["Insert"];
export type CommentUpdate = Database["public"]["Tables"]["comment"]["Update"];

export type Comment = CommentEntity & { author: ProfileEntity };

export type UseMutationCallback = {
  onSuccess?: () => void;
  onMutate?: () => void;
  onSettled?: () => void;
  onError?: (error: Error) => void;
};
