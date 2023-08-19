import { DefaultButton } from "@/components/DefaultButton";
import { Box, FormLabel, Stack, TextField } from "@mui/material";

const formFields = [
  { label: "Seu ID", type: "text" },
  { label: "Senha", type: "password" },
];

export default function Home() {
  return (
    <Stack justifyContent="center">
      <Box component="form">
        <Stack gap="2rem">
          <FormLabel sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Área Exclusiva
          </FormLabel>
          {formFields.map((fieldInfo, i) => (
            <TextField
              key={i}
              variant="outlined"
              sx={{ backgroundColor: "#FFFFFFBB" }}
              {...fieldInfo}
            />
          ))}
          <DefaultButton>Login</DefaultButton>
        </Stack>
      </Box>
    </Stack>
  );
}
