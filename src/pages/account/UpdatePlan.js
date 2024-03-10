import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/StarBorder";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ActionAlert from "../../components/common/display/ActionAlert";
import * as planConstants from "../../constants/planConstants";
import api from "../../services/Api.js";
import * as settings from "../../settings";

function UpdatePlan() {
  const navigate = useNavigate();
  const location = useLocation();
  const [billingInfo, setBillingInfo] = React.useState(null);
  const [productInfo, setProductInfo] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const planId = location.state?.planId;
    retrieveBillingInfo();
    if (planId != null) {
      retrieveProductInfo(planId);
    } else {
      navigate({
        pathname: "/account/current-plan",
      });
    }
  }, [navigate, location.state]);

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

  const retrieveProductInfo = (productId) => {
    axios
      .get(
        `${settings.API_SERVER}/api/payments/retrieve-product-info/`,
        {
          params: { product_id: productId },
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setProductInfo(res.data);
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

  const updateSubscription = async (selectedProductId) => {
    return await api
      .post("/payments/update-subscription/", {
        selected_product_id: selectedProductId,
      })
      .then((res) => {
        return res;
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

  // Handle form submission.
  const handleUpdateSubscription = async (event, selectedProductId) => {
    event.preventDefault();
    setLoading(true);
    const res = await updateSubscription(selectedProductId);
    if (res) {
      navigate("/account/current-plan", {
        state: { successfullyUpdatedPlan: true },
      });
    }
    setLoading(false);
  };

  const newPlan = productInfo ? productInfo.product : null;
  const paymentDetails = billingInfo
    ? billingInfo.customers_current_payment_method_details
    : null;
  const currentPlan = billingInfo
    ? billingInfo.customers_current_product
    : null;
  const currentSubscriptionEnd = billingInfo
    ? billingInfo.subscription_end
    : null;

  if (currentPlan && currentPlan.id === location.state?.planId) {
    return <Navigate to="/account/current-plan" />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      {newPlan && currentPlan ? (
        <div>
          <Container
            disableGutters
            maxWidth="sm"
            component="main"
            sx={{ pt: 8, pb: 6, color: "primary.main" }}
          >
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              Update Plan to {newPlan.name}
            </Typography>
          </Container>

          <Container sx={{ pt: 8, pb: 15 }} maxWidth="md" component="main">
            {error && (
              <Grid mt={2} mb={1} justifyContent="center" container spacing={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <ActionAlert
                    severity="error"
                    message={error}
                    openAlert={true}
                  />
                </Grid>
              </Grid>
            )}
            <Grid
              container
              spacing={5}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item key={newPlan.name} pb={10} xs={12} sm={12} md={8}>
                <Card sx={{ minHeight: "400px" }}>
                  <CardHeader
                    title={newPlan.name}
                    titleTypographyProps={{ align: "center" }}
                    action={newPlan.name === "Starter" ? <StarIcon /> : null}
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
                        ${newPlan.prices[0].price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        / {planConstants.INTERVALS[newPlan.prices[0].interval]}
                      </Typography>
                    </Box>
                    <Box>
                      <List>
                        {newPlan.descriptions.map((line) => (
                          <ListItem key={line.description} disablePadding>
                            <ListItemButton>
                              <ListItemText primary={line.description} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Box>

                    <Divider />
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      sx={{ textAlign: { xs: "left" } }}
                    >
                      <Grid item xs={12}>
                        <Typography
                          mt={4}
                          gutterBottom
                          color="text.secondary"
                          variant="subtitle1"
                        >
                          What happens next?
                        </Typography>
                        <Typography
                          mt={4}
                          sx={{ fontSize: 12 }}
                          color="text.secondary"
                        >
                          You will
                          {newPlan.tier < currentPlan.tier
                            ? ` loose access to the ${currentPlan.name} `
                            : ` gain access to the ${newPlan.name} `}
                          plan starting today.
                        </Typography>
                        <Typography
                          sx={{ fontSize: 12 }}
                          color="text.secondary"
                        >
                          You will be charged ${newPlan.prices[0].price} /{" "}
                          {planConstants.INTERVALS[newPlan.prices[0].interval]}{" "}
                          starting{" "}
                          {currentSubscriptionEnd !== null
                            ? ` on ${currentSubscriptionEnd}.`
                            : "today."}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      sx={{ textAlign: { xs: "left" } }}
                    >
                      <Grid item xs={12}>
                        <Typography
                          color="text.secondary"
                          gutterBottom
                          mt={4}
                          variant="subtitle1"
                        >
                          Payment Method:
                        </Typography>
                      </Grid>
                      {paymentDetails ? (
                        <Grid
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={1}
                          mt={4}
                          sx={{ textAlign: { xs: "center" } }}
                        >
                          <Grid item xs={12} sm={1}>
                            <CreditCardIcon />
                          </Grid>

                          <Grid item xs={12} sm={5}>
                            <Typography>
                              {paymentDetails.brand.toUpperCase()} Ending in{" "}
                              {paymentDetails.last4}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography color="text.secondary">
                              Expires {paymentDetails.exp_month}/
                              {paymentDetails.exp_year}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={1}>
                            <IconButton
                              onClick={() =>
                                navigate("/account/billing", {
                                  state: { shouldGoBacktoUpdatePlan: true },
                                })
                              }
                            >
                              <EditIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ) : (
                        <Box>
                          <IconButton
                            onClick={() =>
                              navigate("/account/billing", {
                                state: { shouldGoBacktoUpdatePlan: true },
                              })
                            }
                          >
                            <AddCircleIcon />
                            <Typography ml={4}>Add Payment Method</Typography>
                          </IconButton>
                        </Box>
                      )}
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item xs={12} sm={6}>
                        <Button
                          onClick={() =>
                            navigate({
                              pathname: "/account/current-plan",
                            })
                          }
                          fullWidth
                          variant={"outlined"}
                        >
                          {"Cancel"}
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <LoadingButton
                          onClick={(e) => {
                            handleUpdateSubscription(e, newPlan.id);
                          }}
                          id="checkout-and-portal-button"
                          type="submit"
                          fullWidth
                          variant={"contained"}
                          loading={loading}
                          loadingPosition="center"
                          disabled={paymentDetails == null}
                        >
                          {"Change Plan"}
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

export default UpdatePlan;
