import { Link, Stack } from "@mui/material";
import { DefaultButton } from "../components/DefaultButton";

export default function Home() {
  return (
    <>
      <Stack justifyContent="center">
        <DefaultButton>Sistema de Caixa</DefaultButton>
      </Stack>
      <Stack justifyContent="space-evenly">
        <Link href="/auth">
          <DefaultButton>Área de Clientes</DefaultButton>
        </Link>
        <Link href="/auth">
          <DefaultButton>Área do Gerente</DefaultButton>
        </Link>
      </Stack>
    </>
  );
}
