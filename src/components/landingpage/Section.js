import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";

function Section({ landingPageData, mediaUrl }) {
  const navigate = useNavigate();

  return (
    <Grid
      sx={{ textAlign: "center" }}
      pt={10}
      pb={10}
      container
      justifyContent={"center"}
    >
      <Grid item xs={12} sm={12} md={8}>
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
            {landingPageData?.secondary_hero_title}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h5"
            sx={{
              paddingBottom: { xs: 2, sm: 2, md: 3, lg: 3 },
              paddingTop: { xs: 2, sm: 2, md: 3, lg: 3 },
              typography: { xs: "body1", sm: "body1", md: "h5", lg: "h5" },
            }}
          >
            {landingPageData?.secondary_hero_subtitle}
          </Typography>
        </Box>
        <Box
          sx={{
            minHeight: { xs: 200, sm: 250, md: 250, lg: 400 },
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${mediaUrl}${landingPageData?.secondary_hero_image})`,
          }}
        />
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

export default Section;
