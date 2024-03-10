import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import ActionAlert from "../common/display/ActionAlert";

function NewsLetterSignup({
  handleSignupForNewsletter,
  handleOnChange,
  isNewsletterSignupSuccess,
  error,
  email,
  loading,
}) {
  return (
    <Grid
      spacing={4}
      sx={{ textAlign: "center" }}
      direction="row"
      pt={10}
      pb={10}
      container
      justifyContent={"center"}
    >
      <Grid item xs={12}>
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              letterSpacing: 3,
              wordBreak: "break-word",
              typography: { xs: "h5", sm: "h4", md: "h3", lg: "h2" },
            }}
            variant="h2"
          >
            Sign up for our newsletter!
          </Typography>

          {isNewsletterSignupSuccess && (
            <Grid mt={2} justifyContent="center" container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <ActionAlert
                  severity="success"
                  message={"Successfully signed up for newsletter!"}
                  openAlert={true}
                />
              </Grid>
            </Grid>
          )}

          {error && error.length > 0 && (
            <Grid mt={2} justifyContent="center" container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <ActionAlert
                  severity="error"
                  message={error}
                  openAlert={true}
                />
              </Grid>
            </Grid>
          )}

          <TextField
            sx={{ paddingTop: 5, paddingBottom: 5 }}
            id="email"
            placeholder="Email"
            variant="standard"
            fullWidth
            required
            value={email}
            onChange={handleOnChange}
            name="email"
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <LoadingButton
          type="submit"
          onClick={(e) => {
            handleSignupForNewsletter(e);
          }}
          sx={{
            marginTop: { xs: 5, sm: 5, md: 5, lg: 10 },
            marginBottom: { xs: 5, sm: 5, md: 5, lg: 10 },
          }}
          size="large"
          variant="contained"
          color="primary"
          loading={loading}
          loadingPosition="center"
        >
          Sign Up for Newsletter!
        </LoadingButton>
      </Grid>
    </Grid>
  );
}
export default NewsLetterSignup;
