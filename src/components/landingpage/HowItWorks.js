import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import IconResolver from "../../utils/IconResolver";

function HowItWorks({ landingPageData, navigate }) {
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
            How it works.
          </Typography>
        </Box>
      </Grid>
      {landingPageData &&
        landingPageData.how_it_works_steps.length > 0 &&
        landingPageData.how_it_works_steps
          .sort((a, b) => a.order - b.order)
          .map((step) => (
            <Grid key={step.order} item xs={12} sm={12} md={4}>
              <Box>
                <IconResolver
                  iconName={step.step_mui_icon_name}
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
                  {step.step}
                </Typography>
              </Box>
              <Box pt={4}>
                <Typography variant="body1">{step.step_description}</Typography>
              </Box>
            </Grid>
          ))}
      <Grid item xs={12}>
        <Button
          onClick={() => navigate(`/signup`)}
          sx={{ marginTop: { xs: 5, sm: 5, md: 5, lg: 10 } }}
          size="large"
          variant="contained"
        >
          Sign Up Now
        </Button>
      </Grid>
    </Grid>
  );
}

export default HowItWorks;
