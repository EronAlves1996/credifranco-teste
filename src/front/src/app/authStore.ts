type User = {
  accumulated_points: number;
  created_at: string;
  id: number;
  name: string;
  role: "MANAGER" | "CLIENT";
  updated_at: string;
};

export const isUser = (object: unknown): object is User => {
  return "role" in (object as User);
};

const store: Record<"XSRF_TOKEN" | "CURRENT_USER", string | User> = {
  XSRF_TOKEN: "",
  CURRENT_USER: {} as User,
};

export const put = (key: keyof typeof store, value: string | User) => {
  store[key] = value;
};

export const get = (key: keyof typeof store) => {
  return store[key];
};
