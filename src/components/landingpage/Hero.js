import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";

function Hero({ landingPageData, mediaUrl }) {
  const navigate = useNavigate();

  return (
    <Grid
      pt={10}
      pb={10}
      direction="row"
      container
      spacing={4}
      alignItems="center"
      sx={{ textAlign: { xs: "center", sm: "left" } }}
    >
      <Grid item xs={12} sm={6} md={6}>
        <Box>
          <Typography variant="h4">
            <Box
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                letterSpacing: 3,
              }}
            >
              {landingPageData?.primary_hero_title}
            </Box>
          </Typography>
          <Typography variant="caption">
            <Box
              sx={{
                paddingTop: 4,
                fontSize: 20,
                fontWeight: "light",
              }}
            >
              {landingPageData?.primary_hero_subtitle}
            </Box>
          </Typography>
          <Button
            onClick={() => navigate(`/signup`)}
            sx={{ marginTop: { xs: 5, sm: 5, md: 5, lg: 10 } }}
            size="large"
            variant="contained"
          >
            Sign Up Now
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Box
          sx={{
            minHeight: { xs: 200, sm: 250, md: 250, lg: 400 },
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${mediaUrl}${landingPageData?.primary_hero_image})`,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Hero;
