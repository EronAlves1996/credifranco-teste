import { DefaultButton } from "@/components/DefaultButton";
import { FormLabel, Stack, TextField } from "@mui/material";
import { Form } from "./Form";

const formFields = [
  { label: "Seu ID", type: "text", name: "identification" },
  { label: "Senha", type: "password", name: "password" },
];

export default function Home() {
  return (
    <Stack justifyContent="center">
      <Form>
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
      </Form>
    </Stack>
  );
}
