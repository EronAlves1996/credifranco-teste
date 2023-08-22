export type User = {
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

type keysOfStore = keyof typeof store;

const subscribers: Array<Record<keysOfStore, (value: User | string) => void>> =
  [];

export const put = (key: keysOfStore, value: string | User) => {
  subscribers
    .filter((subscriber) => Object.keys(subscriber)[0] === key)
    .forEach((subscriber) => {
      subscriber[key](value);
    });

  store[key] = value;
};

export const get = (key: keysOfStore) => {
  return store[key];
};

export const subscribe = (
  key: keysOfStore,
  subscriptionFunction: (value: User | string) => void
) => {
  const subscriptionRecord: Record<
    keysOfStore,
    (value: User | string) => void
  > = {} as Record<keysOfStore, (value: User | string) => void>;

  subscriptionRecord[key] = subscriptionFunction;

  subscribers.push(subscriptionRecord);
  return get(key);
};
