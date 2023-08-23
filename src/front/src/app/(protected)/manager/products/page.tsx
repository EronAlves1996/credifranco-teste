"use client";
import {
  FormLabel,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DefaultButton } from "@/components/DefaultButton";
import { Metadata } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { Form } from "./Form";
import { getProducts } from "@/app/utils/fetchUtils";
import { Loading } from "../../loadingComponent";

export const metadata: Metadata = {
  title: "Area do Gerente",
};

export default function ManageProducts() {
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState<
    | Array<{ id: number; product: string; price: number; discount: number }>
    | undefined
  >();

  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = () =>
    getProducts()
      .then((res) => res.json())
      .then(setProducts)
      .then(() => setIsLoading(false));

  useEffect(() => {
    fetchProducts();
  }, []);

  const formFields = [
    { label: "Produto", type: "text", name: "product" },
    {
      label: "Preço",
      type: "number",
      name: "price",
      value: price,
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setPrice(parseFloat(e.target.value)),
    },
    {
      label: "Desconto",
      type: "number",
      name: "discount",
      min: "0",
      max: "100",
      value: discount,
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setDiscount(parseFloat(e.target.value)),
    },
  ];

  return isLoading ? (
    <Loading />
  ) : (
    <Stack justifyContent="center">
      <Form refetchFunction={fetchProducts}>
        <Stack alignItems="stretch" gap="1rem">
          <FormLabel
            sx={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              alignSelf: "center",
            }}
          >
            Registrar Promoção
          </FormLabel>
          <Stack gap="2rem" direction="row" alignSelf="center">
            {formFields.map((fieldInfo, i) => (
              <TextField
                key={i}
                variant="outlined"
                sx={{ backgroundColor: "#FFFFFFBB" }}
                required
                {...fieldInfo}
              />
            ))}
          </Stack>
          <Stack direction="row" justifyContent="space-around">
            <Typography>
              Valor Final: R$ {(price * (1 - discount / 100)).toFixed(2)}
            </Typography>
            <DefaultButton type="submit">Registrar Promoção</DefaultButton>
          </Stack>
        </Stack>
      </Form>
      <Typography variant="h5">Produtos na Promoção</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "aqua" }}>
              <TableCell>Produto</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>% desconto</TableCell>
              <TableCell>Valor Final</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map(({ id, discount, price, product }) => (
              <TableRow key={id}>
                <TableCell>{product}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell>{discount}</TableCell>
                <TableCell>
                  {(price * (1 - discount / 100)).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
