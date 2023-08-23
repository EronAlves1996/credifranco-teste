"use client";
import { FormLabel, Stack, TextField, Typography } from "@mui/material";
import { DefaultButton } from "@/components/DefaultButton";
import { Metadata } from "next";
import { ChangeEvent, useState } from "react";
import { Form } from "./Form";

export const metadata: Metadata = {
  title: "Area do Gerente",
};

export default function ManageProducts() {
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);

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

  return (
    <>
      <Stack justifyContent="center">
        <Form>
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
      </Stack>
    </>
  );
}
