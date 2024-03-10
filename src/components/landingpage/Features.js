import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import IconResolver from "../../utils/IconResolver";

function Features({ landingPageData }) {
  return (
    <Grid
      spacing={4}
      sx={{ textAlign: "center" }}
      direction="row"
      pt={10}
      pb={10}
      container
    >
      <Grid pb={6} item xs={12}>
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              letterSpacing: 3,
              typography: { xs: "h4", sm: "h4", md: "h3", lg: "h2" },
            }}
            variant="h2"
          >
            Features
          </Typography>
        </Box>
      </Grid>
      {landingPageData &&
        landingPageData.features.length > 0 &&
        landingPageData.features
          .sort((a, b) => a.order - b.order)
          .map((feature) => (
            <Grid key={feature.order} item xs={12} sm={12} md={4}>
              <Box>
                <IconResolver
                  iconName={feature.feature_mui_icon_name}
                  fontSize="large"
                  sx={{
                    color: "primary.main",
                  }}
                />
                <Typography
                  sx={{
                    typography: { xs: "h5", sm: "h5", md: "h4", lg: "h4" },
                    color: "primary.main",
                  }}
                  variant="h4"
                >
                  {feature.feature_title}
                </Typography>
              </Box>
              <Box pt={4}>
                <Typography variant="body1">
                  {feature.feature_description}
                </Typography>
              </Box>
            </Grid>
          ))}
    </Grid>
  );
}

export default Features;
