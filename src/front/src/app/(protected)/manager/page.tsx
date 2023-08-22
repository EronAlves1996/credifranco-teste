import { FormLabel, Stack, TextField } from "@mui/material";
import { Form } from "./Form";
import { DefaultButton } from "@/components/DefaultButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Area do Gerente",
};

const formFields = [
  { label: "Produto", type: "text", name: "product" },
  { label: "Preço", type: "number", name: "price" },
  { label: "Desconto", type: "number", name: "discount", min: "0", max: "100" },
];

export default function ManagerArea() {
  return (
    <Stack justifyContent="center">
      <Form>
        <Stack gap="2rem">
          <FormLabel sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Registrar Promoção
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
          <DefaultButton type="submit">Registrar Promoção</DefaultButton>
        </Stack>
      </Form>
    </Stack>
  );
}
