import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import React from "react";
import { useLocation } from "react-router-dom";
import BreadcrumbsRouter from "../display/BreadcrumbsRouter";
import Footer from "./Footer";
import TopBar from "./TopBar";

const PREFIX = "Layout";

const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled("div")(({ theme }) => ({
  [`& .${classes.root}`]: {
    position: "relative",
    minHeight: "100vh",
  },
}));

export default function Layout(props) {
  let location = useLocation();

  return (
    <Root>
      <CssBaseline />
      <div className={classes.root}>
        <TopBar pathName={location.pathname} {...props} />
        <div style={{ padding: 45 }}>
          <BreadcrumbsRouter />
          <div>{props.children}</div>
        </div>
        <Footer />
      </div>
    </Root>
  );
}
