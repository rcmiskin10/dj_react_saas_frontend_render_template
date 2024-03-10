import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EditIcon from "@mui/icons-material/Edit";
import { LoadingButton } from "@mui/lab";
import { Button, Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ActionAlert from "../../components/common/display/ActionAlert";
import {
  StripeTextFieldCVC,
  StripeTextFieldExpiry,
  StripeTextFieldNumber,
} from "../../components/stripe/StripeTextFields";
import api from "../../services/Api.js";

function Billing(props) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = React.useState({
    cardNumberComplete: false,
    expiredComplete: false,
    cvcComplete: false,
    cardNumberError: null,
    expiredError: null,
    cvcError: null,
    showCreditCardForm:
      location.state && location.state.shouldGoBacktoUpdatePlan ? true : false,
    selectedProductId: null,
    openSuccessAlert: false,
    openErrorAlert: false,
    openAlertDialog: false,
  });

  const [billingInfo, setBillingInfo] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [stripeError, setStripeError] = React.useState(null);

  React.useEffect(() => {
    retrieveBillingInfo();
  }, []);

  const onElementChange =
    (field, errorField) =>
    ({ complete, error = { message: null } }) => {
      setState({ ...state, [field]: complete, [errorField]: error.message });
    };

  const handleEditClick = (selectedProductId) => {
    setState({
      showCreditCardForm: !state.showCreditCardForm,
      selectedProductId: selectedProductId,
    });
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

  const postPaymentMethod = (paymentMethodId) => {
    return api
      .post("/payments/add-payment-method/", {
        payment_method_id: paymentMethodId,
      })
      .then((res) => {
        return res;
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          setStripeError(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          setStripeError("The request was made but no response was received.");
        } else {
          // Something happened in setting up the request that triggered an Error
          setStripeError("Error: " + error.message);
        }
      });
  };

  // Handle form submission.
  const addPaymentMethod = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (cardNumberElement == null) {
      return;
    }

    // add these lines
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (error) {
      return;
    }

    const res = await postPaymentMethod(paymentMethod.id);

    if (res) {
      if (location.state && location.state.shouldGoBacktoUpdatePlan) {
        navigate(-1); //go back
      } else {
        const retrieveBillingInfoResult = await retrieveBillingInfo();
        if (retrieveBillingInfoResult) {
          setState({ openSuccessAlert: true, showCreditCardForm: false });
        } else {
          setState({ openErrorAlert: true });
        }
      }
    }
  };

  const {
    cardNumberError,
    expiredError,
    cvcError,
    openSuccessAlert,
    openErrorAlert,
  } = state;
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
          Billing
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          All your billing information.
        </Typography>

        {stripeError &&
          stripeError.length > 0 &&
          stripeError
            .filter((error) => error.field === "detail")
            .map((error) => (
              <Grid mt={2} mb={1} justifyContent="center" container spacing={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <ActionAlert
                    severity="error"
                    message={error.detail}
                    openAlert={openErrorAlert}
                  />
                </Grid>
              </Grid>
            ))}

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
        <Grid mt={2} mb={2} justifyContent="center" container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <ActionAlert
              severity="success"
              message={"Successfully updated payment information!"}
              openAlert={openSuccessAlert}
            />
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ pt: 8, pb: 15 }} component="main">
        <Grid
          container
          spacing={5}
          justifyContent="center"
          alignItems="flex-end"
        >
          <Grid item xs={12} sm={12} md={9}>
            <Card sx={{ mb: 6 }} ariant="outlined">
              <CardContent>
                <Box>
                  {billingInfo &&
                    (billingInfo.customers_current_payment_method_details ? (
                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                        sx={{ textAlign: { xs: "center", sm: "left" } }}
                      >
                        {" "}
                        <Grid item xs={12} sm={2}>
                          <CreditCardIcon />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Typography>Payment Method</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography>
                            {billingInfo.customers_current_payment_method_details.brand.toUpperCase()}{" "}
                            Ending in{" "}
                            {
                              billingInfo
                                .customers_current_payment_method_details.last4
                            }
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography color="text.secondary">
                            Expires{" "}
                            {
                              billingInfo
                                .customers_current_payment_method_details
                                .exp_month
                            }
                            /
                            {
                              billingInfo
                                .customers_current_payment_method_details
                                .exp_year
                            }
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                          <IconButton onClick={handleEditClick}>
                            <EditIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                      >
                        <Grid item xs={4}>
                          <IconButton onClick={handleEditClick}>
                            <AddCircleIcon />
                            <Typography ml={4}>Add Payment Method</Typography>
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                </Box>

                {state.showCreditCardForm && (
                  <Box mt={6}>
                    <Grid justifyContent="center" container spacing={1}>
                      <Typography mb={6} color="text.secondary">
                        Enter your credit card information.
                      </Typography>
                    </Grid>
                    <form>
                      {/* <CardElement /> */}
                      <Grid justifyContent="center" container spacing={1}>
                        <Grid
                          item
                          mb={2}
                          lg={6}
                          md={6}
                          sm={12}
                          xs={12}
                          id={"card-number"}
                        >
                          <StripeTextFieldNumber
                            error={Boolean(cardNumberError)}
                            labelErrorMessage={cardNumberError}
                            onChange={onElementChange(
                              "cardNumberComplete",
                              "cardNumberError"
                            )}
                          />
                        </Grid>
                        <Grid
                          item
                          mb={2}
                          lg={3}
                          md={3}
                          sm={12}
                          xs={12}
                          id={"expired-date"}
                        >
                          <StripeTextFieldExpiry
                            error={Boolean(expiredError)}
                            labelErrorMessage={expiredError}
                            onChange={onElementChange(
                              "expiredComplete",
                              "expiredError"
                            )}
                          />
                        </Grid>
                        <Grid
                          item
                          mb={2}
                          lg={3}
                          md={3}
                          sm={12}
                          xs={12}
                          id={"cvc"}
                        >
                          <StripeTextFieldCVC
                            error={Boolean(cvcError)}
                            labelErrorMessage={cvcError}
                            onChange={onElementChange(
                              "cvcComplete",
                              "cvcError"
                            )}
                          />
                        </Grid>

                        <Grid justifyContent="center" container spacing={1}>
                          {location.state &&
                            location.state.shouldGoBacktoUpdatePlan && (
                              <Grid item lg={3} md={3} sm={3} xs={12}>
                                <Box mt={6} mb={2}>
                                  <Button
                                    onClick={() => {
                                      navigate(-1); //goback
                                    }}
                                    variant="outlined"
                                    fullWidth
                                  >
                                    Cancel
                                  </Button>
                                </Box>
                              </Grid>
                            )}
                          <Grid item lg={3} md={3} sm={3} xs={12}>
                            <Box mt={6} mb={2}>
                              <LoadingButton
                                fullWidth
                                onClick={(e) => addPaymentMethod(e)}
                                variant="contained"
                                color="primary"
                                loading={Boolean(props.isLoading)}
                                loadingPosition="center"
                              >
                                Submit
                              </LoadingButton>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </form>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Billing;
