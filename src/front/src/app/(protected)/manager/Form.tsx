"use client";
import { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { config } from "@/config";
import * as authStore from "../../authStore";

export const Form = ({ children }: PropsWithChildren) => {
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        const { target } = e;

        const formData = new FormData(target as unknown as HTMLFormElement);

        const payload = Object.fromEntries(formData);

        fetch(config.API_URL + "api/product", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": authStore.get("XSRF_TOKEN"),
          } as HeadersInit,
          credentials: "include",
        }).then((res) => {
          if (res.ok) console.log(res);
          else console.log("error");
        });
      }}
    >
      {children}
    </Box>
  );
};
