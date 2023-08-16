import { Box, Button, Container, Stack, Typography } from "@mui/material";

const InitialPageButton = ({ children }: React.PropsWithChildren) => (
  <Button variant="outlined" size="large" sx={{ backgroundColor: "#FFF" }}>
    <Typography fontWeight="bold">{children}</Typography>
  </Button>
);

export default function Home() {
  return (
    <main>
      <Container>
        <Stack minHeight="100vh">
          <Box borderBottom="3px solid">
            <Typography variant="h2" textAlign="center">
              Supermercado Credifranco
            </Typography>
          </Box>
          <Stack
            flexGrow={1}
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundImage: "url(./market-stock.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-around"
              flexGrow={0.7}
              width="80%"
              sx={{ backgroundColor: "#FFFFFFAA" }}
            >
              <Stack justifyContent="center">
                <InitialPageButton>Sistema de Caixa</InitialPageButton>
              </Stack>
              <Stack justifyContent="space-evenly">
                <InitialPageButton>Área de Clientes</InitialPageButton>
                <InitialPageButton>Área do Gerente</InitialPageButton>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </main>
  );
}
