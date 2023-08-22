import { config } from "@/config";
import { storeCsrf } from "../security/storeCsrf";

export const getCsrfToken = () => {
  return fetch(config.API_URL + "sanctum/csrf-cookie", {
    credentials: "include",
  }).then(() => storeCsrf());
};
