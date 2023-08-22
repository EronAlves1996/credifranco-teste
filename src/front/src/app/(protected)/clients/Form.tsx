import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import * as authStore from "../../authStore";
import { checkActiveSession, updateUserInfo } from "@/app/utils/fetchUtils";
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

        const formData = extractPayloadFromForm(target);

        const user = structuredClone(authStore.get("CURRENT_USER"));

        if (!authStore.isUser(user)) return;

        const newPoints = user.accumulated_points - Number(formData["points"]);

        if (isNaN(newPoints) || newPoints < 0) {
          notify(
            "Pontos para voucher são maiores do que os pontos que você tem",
            "error"
          );

          throw new Error("Invalid Points");
        }

        user.accumulated_points = newPoints;

        updateUserInfo(user.id, user)
          .then((res) => {
            if (!res.ok) {
              notify("Voucher não foi criado", "error");
              throw new Error("");
            }

            notify("Seu voucher XXX foi criado com sucesso", "success");
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
