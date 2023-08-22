import * as authStore from "../authStore";

export const storeCsrf = () => {
  const token = document.cookie
    .split("; ")
    .find((cookie) => cookie.includes("XSRF-TOKEN"))
    ?.split("=")[1];

  if (token) authStore.put("XSRF_TOKEN", decodeURIComponent(token));
};
