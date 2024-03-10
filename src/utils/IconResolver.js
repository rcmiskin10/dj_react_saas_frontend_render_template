import * as Icons from "@mui/icons-material";
import React from "react";

const IconResolver = ({ iconName, ...props }) => {
  const IconComponent = Icons[iconName];
  if (!IconComponent) {
    return null; // You can return a default icon or an empty element here
  }

  return <IconComponent {...props} />;
};

export default IconResolver;
