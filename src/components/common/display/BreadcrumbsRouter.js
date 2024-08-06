import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../../utils/AuthContext";

const breadcrumbNameMap = {
  "/account": "Account",
  "/account/current-plan": "Current Plan",
  "/account/update-plan": "Update Plan",
  "/account/billing": "Billing",
  "/account/profile": "Profile",
  "/login": "Login",
  "/signup": "Sign Up",
  "/forgot-password": "Forgot Password",
  "/reset-password": "Reset Password",
  "/blog": "Blog",
  "/create-landing-page": "Create Landing Page",
};

function LinkRouter(props) {
  return <Link {...props} component={RouterLink} />;
}

function BreadcrumbsRouter() {
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);

  const pathnames = location.pathname.split("/").filter((x) => x);
  const isPathLoggedInHomePage = pathnames[pathnames.length - 1] === "home";
  const isNonEmptyPathNamesList = pathnames.length >= 1;

  const capitalize = ([first, ...rest], lowerRest = false) => {
    return (
      first.toUpperCase() +
      (lowerRest ? rest.join("").toLowerCase() : rest.join(""))
    );
  };

  return (
    <Breadcrumbs sx={{ color: "primary.main" }} aria-label="breadcrumb">
      {isLoggedIn ? (
        <LinkRouter underline="hover" color="inherit" to="/home/">
          Home
        </LinkRouter>
      ) : (
        <LinkRouter underline="hover" color="inherit" to="/">
          Home
        </LinkRouter>
      )}
      {isNonEmptyPathNamesList &&
        !isPathLoggedInHomePage &&
        pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return last || breadcrumbNameMap[to] == null ? (
            <Typography key={to}>
              {breadcrumbNameMap[to] == null
                ? capitalize(value, true) // not in map so don't and not null so dont make into link
                : breadcrumbNameMap[to]}
            </Typography>
          ) : (
            <LinkRouter underline="hover" color="inherit" to={to} key={to}>
              {breadcrumbNameMap[to]}
            </LinkRouter>
          );
        })}
    </Breadcrumbs>
  );
}

export default BreadcrumbsRouter;
