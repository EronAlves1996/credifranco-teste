"use client";
import { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { config } from "@/config";
import * as authStore from "../../authStore";
import { createProduct } from "@/app/utils/fetchUtils";
import { extractPayloadFromForm } from "@/app/utils/extractPayloadFromForm";

export const Form = ({ children }: PropsWithChildren) => {
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        const { target } = e;

        const payload = extractPayloadFromForm(target);

        createProduct(payload).then((res) => {
          if (res.ok) console.log(res);
          else console.log("error");
        });
      }}
    >
      {children}
    </Box>
  );
};
