import { config } from "@/config";
import { getDefaultHeaders } from "./getDefaultHeaders";

const fetcher = (url: string, init: RequestInit) => {
  return fetch(url, {
    ...init,
    credentials: "include",
    headers: getDefaultHeaders(),
  });
};

export const makeLogin = (body: object) => {
  return fetcher(config.API_URL + "api/login", {
    body: JSON.stringify(body),
    method: "POST",
  });
};

export const checkActiveSession = () => {
  return fetcher(config.API_URL + "api/user", {
    credentials: "include",
  });
};

export const createProduct = (body: object) => {
  return fetcher(config.API_URL + "api/product", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const updateUserInfo = (id: number, body: object) => {
  return fetcher(config.API_URL + "api/user/" + id, {
    method: "PUT",
    body: JSON.stringify(body),
  });
};
