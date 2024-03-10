import TextField from "@mui/material/TextField";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import React from "react";
import StripeInput from "./StripeInput";

const StripeTextField = (props) => {
  const {
    helperText,
    InputLabelProps,
    InputProps = {},
    inputProps,
    error,
    labelErrorMessage,
    stripeElement,
    ...other
  } = props;

  return (
    <TextField
      fullWidth
      required
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      error={error}
      InputProps={{
        ...InputProps,
        inputProps: {
          ...inputProps,
          ...InputProps.inputProps,
          component: stripeElement,
        },
        inputComponent: StripeInput,
      }}
      helperText={error ? labelErrorMessage : helperText}
      {...other}
    />
  );
};

export function StripeTextFieldNumber(props) {
  return (
    <StripeTextField
      label="Credit Card Number"
      stripeElement={CardNumberElement}
      {...props}
    />
  );
}

export function StripeTextFieldExpiry(props) {
  return (
    <StripeTextField
      label="Expires"
      stripeElement={CardExpiryElement}
      {...props}
    />
  );
}

export function StripeTextFieldCVC(props) {
  return (
    <StripeTextField
      label="CVC Code"
      stripeElement={CardCvcElement}
      {...props}
    />
  );
}
