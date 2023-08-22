export type User = {
  accumulated_points: number;
  created_at: string;
  id: number;
  name: string;
  role: "MANAGER" | "CLIENT";
  updated_at: string;
};

type KeysOfStore = keyof typeof store;
type SubscriptionFunction = (value: User | string) => void;
type SubscribeObject = Record<KeysOfStore, SubscriptionFunction>;

export const isUser = (object: unknown): object is User => {
  return "role" in (object as User);
};

const store: Record<"XSRF_TOKEN" | "CURRENT_USER", string | User> = {
  XSRF_TOKEN: "",
  CURRENT_USER: {} as User,
};

const subscribers: Array<SubscribeObject> = [];

export const put = (key: KeysOfStore, value: string | User) => {
  subscribers
    .filter((subscriber) => Object.keys(subscriber)[0] === key)
    .forEach((subscriber) => {
      subscriber[key](value);
    });

  store[key] = value;
};

export const get = (key: KeysOfStore) => {
  return store[key];
};

export const subscribe = (
  key: KeysOfStore,
  subscriptionFunction: SubscriptionFunction
) => {
  const subscriptionRecord: SubscribeObject = {} as SubscribeObject;

  subscriptionRecord[key] = subscriptionFunction;

  subscribers.push(subscriptionRecord);
  return get(key);
};
