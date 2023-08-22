"use client";
import { PropsWithChildren, useEffect } from "react";
import { config } from "@/config";
import * as authStore from "../authStore";
import { getCsrfToken } from "../security/getCsrfToken";
import { usePathname, useRouter } from "next/navigation";
import { redirectUserToExclusiveArea } from "../security/redirectToExclusiveArea";
import { storeCsrf } from "../security/storeCsrf";

export default function ProtectedLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const user = authStore.get("CURRENT_USER");

      if (!authStore.isUser(user)) {
        const token = authStore.get("XSRF_TOKEN");

        if (!token) {
          await getCsrfToken();
        }

        const response = await fetch(config.API_URL + "api/user", {
          credentials: "include",
          headers: {
            "X-XSRF-TOKEN": authStore.get("XSRF_TOKEN"),
            Acccept: "application/json",
          } as HeadersInit,
        });

        if (response.ok) {
          const user = await response.json();

          if (authStore.isUser(user)) {
            authStore.put("CURRENT_USER", user);
            return redirectUserToExclusiveArea(router);
          }
        }

        return router.push("/");
      }

      const { role } = user;

      if (role !== "MANAGER") return router.push("/clients");
    })();
  }, [pathname, router]);

  return <>{children}</>;
}
