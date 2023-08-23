import { Link, Stack, Typography } from "@mui/material";
import { DefaultButton } from "@/components/DefaultButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Area do Gerente",
};

export default function ManagerArea() {
  return (
    <Stack alignItems="center" gap="2rem" alignSelf="center">
      <Typography variant="h4">Bem vindo, Gerente!</Typography>
      <Typography>O que irá querer fazer hoje?</Typography>
      <Link href="manager/products">
        <DefaultButton>Gerenciar Produtos</DefaultButton>
      </Link>
      <Link href="./manageClients">
        <DefaultButton>Listar Clientes</DefaultButton>
      </Link>
    </Stack>
  );
}
