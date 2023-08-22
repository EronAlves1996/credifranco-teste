"use client";
import { PropsWithChildren } from "react";
import * as authStore from "../authStore";
import { Box } from "@mui/material";
import { config } from "@/config";
import { redirect } from "next/navigation";

const isUser = (object: unknown): object is authStore.User => {
  return "role" in (object as authStore.User);
};

const storeCsrf = () => {
  const token = document.cookie
    .split("; ")
    .find((cookie) => cookie.includes("XSRF-TOKEN"))
    ?.split("=")[1];

  if (token) authStore.put("XSRF_TOKEN", decodeURIComponent(token));
};

const redirectUserToExclusiveArea = () => {
  const user = authStore.get("CURRENT_USER");

  if (!isUser(user)) return redirect("/");

  const { role } = user;

  if (role === "MANAGER") return redirect("/manager");
  if (role === "CLIENT") return redirect("/clients");
};

export const Form = ({ children }: PropsWithChildren) => {
  return (
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
          .then(() => storeCsrf())
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
            redirectUserToExclusiveArea();
            storeCsrf();
          });
      }}
    >
      {children}
    </Box>
  );
};
