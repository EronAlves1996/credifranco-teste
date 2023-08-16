import { Button, Stack, Typography } from "@mui/material";

const InitialPageButton = ({ children }: React.PropsWithChildren) => (
  <Button variant="outlined" size="large" sx={{ backgroundColor: "#FFF" }}>
    <Typography fontWeight="bold">{children}</Typography>
  </Button>
);
export default function Home() {
  return (
    <>
      <Stack justifyContent="center">
        <InitialPageButton>Sistema de Caixa</InitialPageButton>
      </Stack>
      <Stack justifyContent="space-evenly">
        <InitialPageButton>Área de Clientes</InitialPageButton>
        <InitialPageButton>Área do Gerente</InitialPageButton>
      </Stack>
    </>
  );
}
