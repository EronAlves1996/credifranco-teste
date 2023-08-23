"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import * as authStore from "../authStore";
import { getCsrfToken } from "../utils/getCsrfToken";
import { usePathname, useRouter } from "next/navigation";
import { redirectUserToExclusiveArea } from "../security/redirectToExclusiveArea";
import { checkActiveSession, doLogout } from "../utils/fetchUtils";
import { Stack, Typography } from "@mui/material";
import { DefaultButton } from "@/components/DefaultButton";
import { toast } from "react-toastify";

const Loading = () => {
  return <Typography variant="h3">Carregando...</Typography>;
};

export default function ProtectedLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
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
        redirectUserToExclusiveArea(router, pathname);
        setLoading(false);
      }
    })();
  }, [pathname, router]);

  return (
    <Stack width="100%">
      {loading ? (
        <Loading />
      ) : (
        <>
          <DefaultButton
            sx={{ alignSelf: "flex-end" }}
            onClick={() => {
              doLogout().then(() => {
                authStore.put("CURRENT_USER", {} as authStore.User);
                redirectUserToExclusiveArea(router, pathname);
                notify("Deslogado com sucesso!");
              });
            }}
          >
            Logout
          </DefaultButton>
          {children}
        </>
      )}
    </Stack>
  );
}
