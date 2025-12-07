import { type Database } from "@/database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];
export type PostInsert = Database["public"]["Tables"]["post"]["Insert"];
export type PostUpdate = Database["public"]["Tables"]["post"]["Update"];

export type UseMutationCallback = {
  onSuccess?: () => void;
  onMutate?: () => void;
  onSettled?: () => void;
  onError?: (error: Error) => void;
};
