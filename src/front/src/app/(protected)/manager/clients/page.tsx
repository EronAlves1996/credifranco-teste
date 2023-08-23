"use client";
import { useEffect, useState } from "react";
import { Loading } from "../../loadingComponent";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getClients } from "@/app/utils/fetchUtils";

export default function ClientList() {
  const [isLoading, setIsLoading] = useState(true);
  const [clientList, setClientList] = useState<
    | Array<{
        identification: string;
        name: string;
        accumulated_points: number;
      }>
    | undefined
  >();

  useEffect(() => {
    getClients()
      .then((res) => res.json())
      .then((clients) => setClientList(clients))
      .then(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Typography typography="h4" alignSelf="center">
        Clientes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "aqua" }}>
              <TableCell>Identificação</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Pontos Acumulados</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientList?.map(({ identification, accumulated_points, name }) => (
              <TableRow key={identification}>
                <TableCell>{identification}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{accumulated_points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
