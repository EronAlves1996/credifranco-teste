"use client";
import { DefaultButton } from "@/components/DefaultButton";
import { config } from "@/config";
import { Box, FormLabel, Stack, TextField } from "@mui/material";
import * as authStore from "../authStore";

const formFields = [
  { label: "Seu ID", type: "text", name: "identification" },
  { label: "Senha", type: "password", name: "password" },
];

export default function Home() {
  return (
    <Stack justifyContent="center">
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          const { target } = e;

          const formData = new FormData(target as unknown as HTMLFormElement);

          const payload = Object.fromEntries(formData);

          fetch(config.API_URL + "sanctum/csrf-cookie", {
            credentials: "include",
          })
            .then(() => {
              const token = document.cookie
                .split("; ")
                .find((cookie) => cookie.includes("XSRF-TOKEN"))
                ?.split("=")[1];

              if (token) authStore.put("XSRF_TOKEN", decodeURIComponent(token));
            })
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

              const token = document.cookie
                .split("; ")
                .find((cookie) => cookie.includes("XSRF-TOKEN"))
                ?.split("=")[1];

              if (token) authStore.put("XSRF_TOKEN", decodeURIComponent(token));
            });
        }}
      >
        <Stack gap="2rem">
          <FormLabel sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Área Exclusiva
          </FormLabel>
          {formFields.map((fieldInfo, i) => (
            <TextField
              key={i}
              variant="outlined"
              sx={{ backgroundColor: "#FFFFFFBB" }}
              required
              {...fieldInfo}
            />
          ))}
          <DefaultButton type="submit">Login</DefaultButton>
        </Stack>
      </Box>
    </Stack>
  );
}
