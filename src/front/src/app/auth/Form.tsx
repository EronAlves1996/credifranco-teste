"use client";
import { PropsWithChildren } from "react";
import * as authStore from "../authStore";
import { Box } from "@mui/material";
import { config } from "@/config";
import { useRouter } from "next/navigation";
import { getCsrfToken } from "../security/getCsrfToken";
import { storeCsrf } from "../security/storeCsrf";
import { redirectUserToExclusiveArea } from "../security/redirectToExclusiveArea";

export const Form = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        const { target } = e;

        const formData = new FormData(target as unknown as HTMLFormElement);

        const payload = Object.fromEntries(formData);

        getCsrfToken()
          .then(() =>
            fetch(config.API_URL + "api/login", {
              body: JSON.stringify(payload),
              method: "POST",
              credentials: "include",
              headers: {
                "X-XSRF-TOKEN": authStore.get("XSRF_TOKEN"),
                Accept: "application/json",
                "Content-Type": "application/json",
              } as HeadersInit,
            })
          )
          .then((response) => response.json())
          .then((user) => {
            authStore.put("CURRENT_USER", user);
            redirectUserToExclusiveArea(router);
            storeCsrf();
          })
          .catch(console.log);
      }}
    >
      {children}
    </Box>
  );
};
