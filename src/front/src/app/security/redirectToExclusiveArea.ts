import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import * as authStore from "../authStore";

export const redirectUserToExclusiveArea = (router: AppRouterInstance, pathname: string) => {
  const user = authStore.get("CURRENT_USER");

  if (!authStore.isUser(user)) return router.push("/");

  const { role } = user;

  if (pathname && role === "MANAGER" && !pathname.startsWith('/manager')) return router.push("/manager");
  if (pathname && role === "CLIENT" && !pathname.startsWith('/clients')) return router.push("/clients");
};
