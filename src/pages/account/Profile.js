import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import ActionAlert from "../../components/common/display/ActionAlert";
import api from "../../services/Api.js";

const initialState = {
  confirmEmail: "",
};

function Profile() {
  const [email, setEmail] = React.useState(null);
  const [{ confirmEmail }, setState] = React.useState(initialState);

  const [error, setError] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  let navigate = useNavigate();

  React.useEffect(() => {
    retrieveProfileInfo();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const retrieveProfileInfo = () => {
    api
      .get("/accounts/retrieve-profile-info/")
      .then((res) => {
        setEmail(res.data.email);
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          setError(error.response.data.detail);
        } else if (error.request) {
          // The request was made but no response was received
          setError("The request was made but no response was received.");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError("Error: " + error.message);
        }
      });
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDeleteAccount = () => {
    handleDialogClose();
    setLoading(true);
    if (confirmEmail !== email) {
      setError(
        "Email address does not match the email associated with your account."
      );
    } else {
      api
        .post("/accounts/delete-profile/")
        .then(() => {
          Cookies.remove("token");
          Cookies.remove("refreshToken");
          navigate(0);
        })
        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            setError(error.response.data.detail);
          } else if (error.request) {
            // The request was made but no response was received
            setError("The request was made but no response was received.");
          } else {
            // Something happened in setting up the request that triggered an Error
            setError("Error: " + error.message);
          }
        });
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6, color: "primary.main" }}
      >
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          Profile
        </Typography>

        {error && (
          <Grid mt={2} mb={1} justifyContent="center" container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <ActionAlert severity="error" message={error} openAlert={true} />
            </Grid>
          </Grid>
        )}
      </Container>

      <Container sx={{ pt: 8, pb: 15 }} maxWidth="lg" component="main">
        <Dialog open={open} onClose={handleDialogClose}>
          <DialogTitle>Delete Account?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your account? This action can not
              be undone. If so please retype your email address below.
            </DialogContentText>
            <TextField
              autoFocus
              onChange={handleOnChange}
              value={confirmEmail}
              required
              margin="dense"
              id="confirmEmail"
              name="confirmEmail"
              label="Confirm Email Address"
              type="confirmEmail"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button
              onClick={(e) => {
                handleDeleteAccount(e);
              }}
            >
              Yes. Delete Account.
            </Button>
          </DialogActions>
        </Dialog>
        <Grid
          container
          spacing={5}
          alignItems="flex-end"
          justifyContent="center"
        >
          <Grid item key={"profile"} xs={12} sm={6} md={4}>
            <Card sx={{ minHeight: "100%" }}>
              <CardHeader
                title={"Profile Information"}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{
                  align: "center",
                }}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "baseline",
                    mb: 2,
                  }}
                >
                  <Typography m={1} variant="h6" color="text.primary">
                    Email:
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {email}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <LoadingButton
                  id="delete-account"
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => {
                    handleDialogOpen();
                  }}
                  loading={loading}
                  loadingPosition="center"
                >
                  {"Delete Account?"}
                </LoadingButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Profile;
