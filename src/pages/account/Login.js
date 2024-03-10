import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { Container, Grid, Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { React, useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ActionAlert from "../../components/common/display/ActionAlert";
import { AuthContext } from "../../utils/AuthContext";

const PREFIX = "Login";

const classes = {
  paper: `${PREFIX}-paper`,
  avatar: `${PREFIX}-avatar`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`,
};

const StyledContainer = styled(Container)(({ theme }) => ({
  [`& .${classes.paper}`]: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  [`& .${classes.avatar}`]: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  [`& .${classes.form}`]: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  [`& .${classes.submit}`]: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [{ email, password }, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { login, isLoggedIn, loginErrors } = useContext(AuthContext);
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    let { from } = location.state || { from: { pathname: "/home/" } };

    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, location.state, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    login(email, password);
    setLoading(false);
  };

  const getErrorHelperText = (fieldName) => {
    let error =
      loginErrors.length > 0
        ? loginErrors.filter((e) => e.field === fieldName)
        : "";
    return error.length > 0 ? error[0].message[0] : "";
  };

  const isError = (fieldName) => {
    let error =
      loginErrors.length > 0
        ? loginErrors.filter((e) => e.field === fieldName)
        : "";
    return error.length > 0;
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }
  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography sx={{ color: "primary.main" }} component="h1" variant="h5">
          Sign in
        </Typography>
        {location.state && location.state.successfullyResetPassword && (
          <Grid mt={2} mb={2} justifyContent="center" container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <ActionAlert
                severity="success"
                message={
                  "Successfully updated password! You can now log in with new password..."
                }
                openAlert={location.state.successfullyResetPassword}
              />
            </Grid>
          </Grid>
        )}
        <Grid mt={2} mb={2} justifyContent="center" container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleOnChange}
                error={isError("email")}
                helperText={getErrorHelperText("email")}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleOnChange}
                error={isError("password")}
                helperText={getErrorHelperText("password")}
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                loading={loading}
                loadingPosition="center"
              >
                Sign In
              </LoadingButton>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password? Reset it here
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
      {loginErrors.length > 0 &&
        loginErrors
          .filter((error) => error.field === "detail")
          .map((error) => (
            <Grid mt={2} mb={1} justifyContent="center" container spacing={1}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <ActionAlert
                  severity="error"
                  message={error.message}
                  openAlert={true}
                />
              </Grid>
            </Grid>
          ))}
    </StyledContainer>
  );
}

export default Login;
