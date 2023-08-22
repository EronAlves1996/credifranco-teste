"use client";
import { FormLabel, Stack, TextField, Typography } from "@mui/material";
import * as authStore from "../../authStore";
import { useEffect, useState } from "react";
import { Form } from "./Form";
import { DefaultButton } from "@/components/DefaultButton";

export default function ClientArea() {
  const [client, setClient] = useState<authStore.User>();

  useEffect(() => {
    authStore.subscribe("CURRENT_USER", (value) => {
      if (!authStore.isUser(value)) return;
      setClient(value);
    });
  }, []);

  return (
    <Stack gap="2rem" paddingY="1rem" alignItems="flex-start">
      <Typography variant="h3">Área do Cliente</Typography>

      <Typography variant="h5">Olá {client?.name}</Typography>

      <Typography>
        Você possui {client?.accumulated_points} para trocar por produtos!
      </Typography>

      <Form>
        <FormLabel>Gerar Voucher</FormLabel>
        <TextField name="points" type="number" required />
        <DefaultButton type="submit">Gerar</DefaultButton>
      </Form>
    </Stack>
  );
}
