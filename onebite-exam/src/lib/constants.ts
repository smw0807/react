export const API_URL = "http://localhost:3000";

// 쿼리 키 팩토리
export const QUERY_KEYS = {
  todo: {
    all: ["todo"],
    list: ["todo", "list"],
    detail: (id: string) => ["todo", "detail", id],
  },
};
