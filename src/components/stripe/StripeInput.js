import { alpha, useTheme } from "@mui/material/styles";
import React from "react";

const StripeInput = React.forwardRef((props, ref) => {
  const { component: Component, options, ...other } = props;
  const theme = useTheme();
  const [mountNode, setMountNode] = React.useState(null);

  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => mountNode.focus(),
    }),
    [mountNode]
  );

  return (
    <Component
      onReady={setMountNode}
      options={{
        ...options,
        style: {
          base: {
            color: theme.palette.text.primary,
            fontSize: "16px",
            lineHeight: "1.4375em", // 23px
            fontFamily: theme.typography.fontFamily,
            "::placeholder": {
              color: alpha(theme.palette.text.primary, 0.42),
            },
          },
          invalid: {
            color: theme.palette.text.primary,
          },
        },
      }}
      {...other}
    />
  );
});

export default StripeInput;
