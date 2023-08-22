"use client";
import { PropsWithChildren, useEffect } from "react";
import * as authStore from "../authStore";
import { getCsrfToken } from "../utils/getCsrfToken";
import { usePathname, useRouter } from "next/navigation";
import { redirectUserToExclusiveArea } from "../security/redirectToExclusiveArea";
import { checkActiveSession, doLogout } from "../utils/fetchUtils";
import { Stack } from "@mui/material";
import { DefaultButton } from "@/components/DefaultButton";
import { toast } from "react-toastify";

export default function ProtectedLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const notify = (content: string) => toast(content);

  useEffect(() => {
    (async () => {
      const user = authStore.get("CURRENT_USER");

      try {
        if (!authStore.isUser(user)) {
          const token = authStore.get("XSRF_TOKEN");

          if (!token) {
            await getCsrfToken();
          }

          const response = await checkActiveSession();

          if (response.ok) {
            const user = await response.json();

            if (authStore.isUser(user)) {
              authStore.put("CURRENT_USER", user);
            }
          }
        }
      } catch (e) {
      } finally {
        redirectUserToExclusiveArea(router);
      }
    })();
  }, [pathname, router]);

  return (
    <Stack width="100%">
      <DefaultButton
        sx={{ alignSelf: "flex-end" }}
        onClick={() => {
          doLogout().then(() => {
            authStore.put("CURRENT_USER", {} as authStore.User);
            redirectUserToExclusiveArea(router);
            notify("Deslogado com sucesso!");
          });
        }}
      >
        Logout
      </DefaultButton>
      {children}
    </Stack>
  );
}
