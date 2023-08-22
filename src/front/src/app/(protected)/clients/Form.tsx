import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import * as authStore from "../../authStore";
import { config } from "@/config";

export const Form = ({ children }: PropsWithChildren) => {
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();

        const { target } = e;

        const formData = Object.fromEntries(
          new FormData(target as HTMLFormElement)
        );

        const token = authStore.get("XSRF_TOKEN");
        const user = structuredClone(authStore.get("CURRENT_USER"));

        if (!authStore.isUser(user)) return;

        const newPoints = user.accumulated_points - Number(formData["points"]);

        if (isNaN(newPoints) || newPoints < 0) {
          throw new Error("Invalid Points");
        }

        user.accumulated_points = newPoints;

        fetch(config.API_URL + "api/user/" + user.id, {
          credentials: "include",
          method: "PUT",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": token,
          } as HeadersInit,
        })
          .then((res) => {
            if (!res.ok) throw new Error("User not updated");
            return fetch(config.API_URL + "api/user", {
              credentials: "include",
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-XSRF-TOKEN": token,
              } as HeadersInit,
            });
          })
          .then((res) => res.json())
          .then((user) => authStore.put("CURRENT_USER", user));
      }}
    >
      {children}
    </Box>
  );
};
