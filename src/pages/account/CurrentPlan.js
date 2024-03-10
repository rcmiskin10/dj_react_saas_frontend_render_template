import StarIcon from "@mui/icons-material/StarBorder";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ActionAlert from "../../components/common/display/ActionAlert";
import api from "../../services/Api.js";

function CurrentPlan() {
  const [billingInfo, setBillingInfo] = React.useState(null);
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    retrieveBillingInfo();
  }, []);

  const handleUpdatePlan = (event, planId) => {
    event.preventDefault();
    navigate("/account/update-plan", { state: { planId } });
  };

  const retrieveBillingInfo = () => {
    api
      .get("/payments/retrieve-billing-info/")
      .then((res) => {
        setBillingInfo(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          setError(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          setError("The request was made but no response was received.");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError("Error: " + error.message);
        }
      });
  };

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
          Current Plan
        </Typography>

        {location.state && location.state.successfullyUpdatedPlan && (
          <Grid mt={2} mb={2} justifyContent="center" container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <ActionAlert
                severity="success"
                message={"Successfully updated plan!"}
                openAlert={location.state.successfullyUpdatedPlan}
              />
            </Grid>
          </Grid>
        )}

        {error && (
          <Grid mt={2} mb={1} justifyContent="center" container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <ActionAlert
                severity="error"
                message={error.message}
                openAlert={true}
              />
            </Grid>
          </Grid>
        )}
      </Container>

      <Container sx={{ pt: 8, pb: 15 }} maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {billingInfo &&
            billingInfo.all_product_choices.length > 0 &&
            billingInfo.all_product_choices.map((plan) => (
              // Premium card is full width at sm breakpoint
              <Grid item key={plan.id} xs={12} sm={12} md={4}>
                <Card sx={{ minHeight: "350px" }}>
                  <CardHeader
                    title={plan.name}
                    titleTypographyProps={{ align: "center" }}
                    action={plan.name === "Starter" ? <StarIcon /> : null}
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
                        justifyContent: "center",
                        alignItems: "baseline",
                        mb: 2,
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h3"
                        color="text.primary"
                      >
                        ${plan.prices[0].price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /mo
                      </Typography>
                    </Box>
                    <Box>
                      <List>
                        {plan.descriptions.map((line) => (
                          <ListItem key={line.description} disablePadding>
                            <ListItemButton>
                              <ListItemText primary={line.description} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={(e) => {
                        handleUpdatePlan(e, plan.id);
                      }}
                      variant={"outlined"}
                      disabled={
                        billingInfo.customers_current_product.id === plan.id
                      }
                      id="checkout-and-portal-button"
                      type="submit"
                      fullWidth
                    >
                      {billingInfo.customers_current_product.id === plan.id
                        ? "Current Plan"
                        : "Select Plan"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default CurrentPlan;
