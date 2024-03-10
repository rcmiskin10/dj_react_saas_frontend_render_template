import { Container, Grid, Paper, Typography } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

function Home() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        fixed
        sx={{
          marginTop: "15vh",
          marginBottom: "10vh",
          borderRadius: "6px",
          backgroundColor: "action.disabledBackground",
          color: "primary.main",
        }}
      >
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={6}>
            <Paper
              sx={{
                minHeight: 100,
                marginTop: "16px",
                marginBottom: "16px",
                padding: "16px",
                color: "primary.main",
              }}
              elevation={0}
            >
              <Typography variant="h5">Home</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              sx={{
                minHeight: 100,
                marginTop: "16px",
                marginBottom: "16px",
                padding: "16px",
                color: "primary.main",
              }}
              elevation={0}
            >
              <Typography variant="h5">Page</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Home;
