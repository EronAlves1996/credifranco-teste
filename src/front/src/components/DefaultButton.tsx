import { Button, ButtonTypeMap, Typography } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

export const DefaultButton = (
  props: React.PropsWithChildren<DefaultComponentProps<ButtonTypeMap>>
) => {
  const { children } = props;

  return (
    <Button
      variant="outlined"
      size="large"
      sx={{ backgroundColor: "#FFF" }}
      {...props}
    >
      <Typography fontWeight="bold">{children}</Typography>
    </Button>
  );
};
