import { Button, Typography } from "@mui/material";

export const DefaultButton = ({ children }: React.PropsWithChildren) => (
  <Button variant="outlined" size="large" sx={{ backgroundColor: "#FFF" }}>
    <Typography fontWeight="bold">{children}</Typography>
  </Button>
);
