import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ActionAlert from "../../components/common/display/ActionAlert";
import * as settings from "../../settings";
import { AuthContext } from "../../utils/AuthContext";

const PREFIX = "SignUp";

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
    marginTop: theme.spacing(3),
  },

  [`& .${classes.submit}`]: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialState = {
  email: "",
  password: "",
  password2: "",
};

function SignUp() {
  const [{ email, password, password2 }, setState] = useState(initialState);
  const [errors, setErrors] = useState([]);

  let navigate = useNavigate();
  let location = useLocation();
  const { login, isLoggedIn } = useContext(AuthContext);

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
    register(email, password, password2);
  };

  const getErrorHelperText = (fieldName) => {
    let error =
      errors.length > 0 ? errors.filter((e) => e.field === fieldName) : "";
    return error.length > 0 ? error[0].message[0] : "";
  };

  const isError = (fieldName) => {
    let error =
      errors.length > 0 ? errors.filter((e) => e.field === fieldName) : "";
    return error.length > 0;
  };

  const register = (email, password, password2) => {
    axios
      .post(
        `${settings.API_SERVER}/api/accounts/register/`,
        {
          email: email,
          password: password,
          password2: password2,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res) {
          login(email, password);
        }
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          let errorList = [];
          if (error.response.data) {
            errorList = Object.keys(error.response.data).map((field) => {
              return { field, message: error.response.data[field] };
            });
          }
          setErrors(errorList);
        } else if (error.request) {
          // The request was made but no response was received
          setErrors(["The request was made but no response was received."]);
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrors(["Error: " + error.message]);
        }
      });
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography sx={{ color: "primary.main" }} component="h1" variant="h5">
          Sign Up For Free
        </Typography>

        {errors.length > 0 &&
          errors
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
        <Grid mt={2} mb={2} justifyContent="center" container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    error={isError("email")}
                    helperText={getErrorHelperText("email")}
                    autoComplete="email"
                    onChange={handleOnChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    error={isError("password")}
                    helperText={getErrorHelperText("password")}
                    autoComplete="current-password"
                    onChange={handleOnChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password2"
                    label="Confirmation Password"
                    type="password"
                    id="password2"
                    error={isError("password")}
                    helperText={getErrorHelperText("password")}
                    autoComplete="current-password2"
                    onChange={handleOnChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    </StyledContainer>
  );
}

export default SignUp;
