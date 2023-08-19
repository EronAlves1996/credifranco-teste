import {
  Button,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const headerCells = ["Produto", "Preço"];

const mockProducts = [
  { product: "Sabão", price: 25.99 },
  {
    product: "Macarrão",
    price: 10.99,
  },
];

export default function Cashier() {
  return (
    <Stack>
      <Table>
        <TableHead>
          <TableRow>
            {headerCells.map((cell) => (
              <TableCell key={cell}>{cell}</TableCell>
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
      <Typography>
        Total R${" "}
        {mockProducts.reduce((total, product) => total + product.price, 0)}
      </Typography>
      <Stack direction="row">
        <TextField variant="outlined" label="ID do produto" />
        <Button variant="outlined">Registrar</Button>
      </Stack>
      <Stack direction="row">
        <TextField variant="outlined" label="CPF do cliente" />
        <Checkbox />
        <Typography>Não informar</Typography>
      </Stack>
      <Stack direction="row">
        <Button variant="outlined">Informar Voucher</Button>
        <Button variant="outlined">Pagar</Button>
      </Stack>
    </Stack>
  );
}
