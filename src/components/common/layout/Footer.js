import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React from "react";
import * as settings from "../../../settings";

const PREFIX = "Footer";

const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
  },
}));

export default function TopBar(props) {
  return (
    <Root className={classes.root}>
      <Typography
        variant="body2"
        align="center"
        sx={{
          color: "primary.main",
        }}
      >
        {"Copyright © "}
        <Link color="inherit" href="/">
          {settings.SITE_NAME}
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Root>
  );
}
