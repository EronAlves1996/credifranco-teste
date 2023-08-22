import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import * as authStore from "../authStore";

export const redirectUserToExclusiveArea = (router: AppRouterInstance) => {
  const user = authStore.get("CURRENT_USER");

  if (!authStore.isUser(user)) return router.push("/");

  const { role } = user;

  if (role === "MANAGER") return router.push("/manager");
  if (role === "CLIENT") return router.push("/clients");
};
