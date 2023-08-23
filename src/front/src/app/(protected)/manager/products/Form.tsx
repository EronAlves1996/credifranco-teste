"use client";
import { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { createProduct } from "@/app/utils/fetchUtils";
import { extractPayloadFromForm } from "@/app/utils/extractPayloadFromForm";
import { toast } from "react-toastify";

export const Form = ({ children }: PropsWithChildren) => {
  const notify = (content: string, type: "error" | "success") =>
    toast(content, { type });

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        const { target } = e;

        const payload = extractPayloadFromForm(target);

        createProduct(payload).then((res) => {
          if (res.ok) notify("Produto criado com sucesso!", "success");
          else notify("Ocorreu um erro", "error");
        });
      }}
    >
      {children}
    </Box>
  );
};
