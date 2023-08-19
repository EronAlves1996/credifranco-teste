import { DefaultButton } from "@/components/DefaultButton";
import {
  Button,
  Checkbox,
  Paper,
  Stack,
  StackTypeMap,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DefaultComponentProps, OverridableComponent } from "@mui/types";

const headerCells = ["Produto", "Preço"];

const mockProducts = [
  { product: "Sabão", price: 25.99 },
  {
    product: "Macarrão",
    price: 10.99,
  },
];

const Row = (
  props: React.PropsWithChildren<DefaultComponentProps<StackTypeMap>>
) => {
  const { children } = props;

  return (
    <Stack direction="row" {...props}>
      {children}
    </Stack>
  );
};

export default function Cashier() {
  return (
    <Stack
      flexGrow={1}
      justifyContent="space-around"
      alignItems="stretch"
      paddingX="5rem"
    >
      <Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headerCells.map((cell) => (
                  <TableCell key={cell}>
                    <Typography fontWeight="bold">{cell}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {mockProducts.map(({ price, product }) => (
                <TableRow key={product}>
                  <TableCell>{product}</TableCell>
                  <TableCell>{price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography alignSelf="flex-end" fontWeight="bold">
          Total R${" "}
          {mockProducts.reduce((total, product) => total + product.price, 0)}
        </Typography>
      </Stack>
      <Row gap="1rem">
        <TextField variant="outlined" label="ID do produto" fullWidth />
        <DefaultButton>Registrar</DefaultButton>
      </Row>
      <Row alignItems="center">
        <TextField variant="outlined" label="CPF do cliente" fullWidth />
        <Checkbox />
        <Typography>Não informar</Typography>
      </Row>
      <Row justifyContent="space-between">
        <DefaultButton>Informar Voucher</DefaultButton>
        <DefaultButton>Pagar</DefaultButton>
      </Row>
    </Stack>
  );
}
