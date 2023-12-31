"use client";
import { PropsWithChildren } from "react";
import * as authStore from "./authStore";
import { Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { getCsrfToken } from "./utils/getCsrfToken";
import { storeCsrf } from "./security/storeCsrf";
import { redirectUserToExclusiveArea } from "./security/redirectToExclusiveArea";
import { extractPayloadFromForm } from "./utils/extractPayloadFromForm";
import { makeLogin } from "./utils/fetchUtils";
import { toast } from "react-toastify";

export const Form = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const notify = (content: string) => toast(content, { type: "error" });

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        const { target } = e;

        const payload = extractPayloadFromForm(target);

        getCsrfToken()
          .then(() => makeLogin(payload))
          .then((response) => response.json())
          .then((user) => {
            authStore.put("CURRENT_USER", user);
            redirectUserToExclusiveArea(router, pathname);
            storeCsrf();
          })
          .catch((err) => notify(err.message));
      }}
    >
      {children}
    </Box>
  );
};
