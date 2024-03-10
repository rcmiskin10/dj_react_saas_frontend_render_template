import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import * as React from "react";

export default function ActionAlert(props) {
  const [open, setOpen] = React.useState(props.openAlert);
  React.useEffect(() => {
    if (props.openAlert) {
      setOpen(props.openAlert);
    }
  }, [props.openAlert]);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          sx={{ mb: 2 }}
          severity={props.severity}
        >
          {props.message}
        </Alert>
      </Collapse>
    </Box>
  );
}
