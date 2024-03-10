import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { Container, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  let navigate = useNavigate();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        sx={{ pt: 10, pb: 5, color: "primary.main" }}
      >
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          Account
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          All your account information and settings.
        </Typography>
      </Container>
      <Container sx={{ pt: 8, pb: 15 }} component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={12} sm={12} md={4}>
            <Card sx={{ height: 150 }} variant="outlined">
              <CardActionArea onClick={() => navigate("/account/billing")}>
                <CardContent>
                  <CreditCardIcon />
                  <Typography>Billing</Typography>
                  <Typography color="text.secondary">
                    Manage your billing information and plans
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Card sx={{ height: 150 }} variant="outlined">
              <CardActionArea onClick={() => navigate("/account/current-plan")}>
                <CardContent>
                  <SubscriptionsIcon />
                  <Typography>Plan information</Typography>
                  <Typography color="text.secondary">
                    Which plan you are subscribed to.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Card sx={{ height: 150 }} variant="outlined">
              <CardActionArea onClick={() => navigate("/account/profile")}>
                <CardContent>
                  <AccountCircleIcon />
                  <Typography>Profile</Typography>
                  <Typography color="text.secondary">
                    Manage your profile
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Account;
