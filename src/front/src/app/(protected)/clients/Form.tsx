import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import * as authStore from "../../authStore";
import { checkActiveSession, updateUserInfo } from "@/app/utils/fetchUtils";
import { extractPayloadFromForm } from "@/app/utils/extractPayloadFromForm";

export const Form = ({ children }: PropsWithChildren) => {
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();

        const { target } = e;

        const formData = extractPayloadFromForm(target);

        const user = structuredClone(authStore.get("CURRENT_USER"));

        if (!authStore.isUser(user)) return;

        const newPoints = user.accumulated_points - Number(formData["points"]);

        if (isNaN(newPoints) || newPoints < 0) {
          throw new Error("Invalid Points");
        }

        user.accumulated_points = newPoints;

        updateUserInfo(user.id, user)
          .then((res) => {
            if (!res.ok) throw new Error("User not updated");
            // gonna refetch user info
            return checkActiveSession();
          })
          .then((res) => res.json())
          .then((user) => authStore.put("CURRENT_USER", user));
      }}
    >
      {children}
    </Box>
  );
};
