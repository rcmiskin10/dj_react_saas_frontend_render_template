import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { Container, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ActionAlert from "../../components/common/display/ActionAlert";
import * as settings from "../../settings";
import { AuthContext } from "../../utils/AuthContext";

const PREFIX = "ForgotPassword";

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
};

function ForgotPassword() {
  const [{ email }, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [isForgotPasswordEmailSent, setIsForgotPasswordEmailSent] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

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

  const forgotPassword = async (email) => {
    setError("");
    setIsForgotPasswordEmailSent(false);
    return await axios
      .post(
        `${settings.API_SERVER}/api/accounts/password_reset/`,
        {
          email: email,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (res) {
        return true;
      })
      .catch(function (error) {
        if (error.response && error.response.data) {
          setError(error.response.data[0]);
        } else if (error.request) {
          // The request was made but no response was received
          setError("The request was made but no response was received.");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError("Error: " + error.message);
        }
        return false;
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await forgotPassword(email);
    if (res) {
      setState(initialState);
      setIsForgotPasswordEmailSent(true);
    } else {
      setIsForgotPasswordEmailSent(false);
    }
    setLoading(false);
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography sx={{ color: "primary.main" }} component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Grid mt={2} mb={2} justifyContent="center" container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={email}
                id="email"
                label="Email"
                name="email"
                onChange={handleOnChange}
                error={error?.length !== 0}
                helperText={""}
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
                Submit
              </LoadingButton>
            </form>
          </Grid>
        </Grid>
      </div>

      {error && (
        <Grid mt={2} mb={1} justifyContent="center" container spacing={1}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <ActionAlert severity="error" message={error} openAlert={true} />
          </Grid>
        </Grid>
      )}

      {isForgotPasswordEmailSent && (
        <Grid mt={2} mb={2} justifyContent="center" container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <ActionAlert
              severity="success"
              message={`Successfully sent reset email to email address provided! 
              Please check email for next steps. Please give it 5 minutes before returning here to resend.`}
              openAlert={isForgotPasswordEmailSent}
            />
          </Grid>
        </Grid>
      )}
    </StyledContainer>
  );
}

export default ForgotPassword;
