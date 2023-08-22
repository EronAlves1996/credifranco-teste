import * as authStore from "../authStore";

export const getDefaultHeaders = () => {
  return {
    "X-XSRF-TOKEN": authStore.get("XSRF_TOKEN"),
    Accept: "application/json",
    "Content-Type": "application/json",
  } as HeadersInit;
};
