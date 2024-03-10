import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import IconResolver from "../../utils/IconResolver";

function SocialMediaLinks({ landingPageData, openInNewTab }) {
  return (
    <Grid
      spacing={1}
      sx={{ textAlign: "center" }}
      direction="row"
      pt={10}
      pb={10}
      container
      justifyContent={"center"}
    >
      {landingPageData &&
        landingPageData.social_media_links.length > 0 &&
        landingPageData.social_media_links.map((link) => (
          <Grid key={link.order} item xs={2} sm={1}>
            <Box>
              <IconResolver
                iconName={link.social_media_mui_icon_name}
                fontSize="large"
                onClick={() => {
                  openInNewTab(link.social_media_link);
                }}
                sx={{ cursor: "pointer", color: "primary.main" }}
              />
            </Box>
          </Grid>
        ))}
    </Grid>
  );
}
export default SocialMediaLinks;
