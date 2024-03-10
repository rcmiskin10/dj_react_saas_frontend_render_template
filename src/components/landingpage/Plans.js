import StarIcon from "@mui/icons-material/StarBorder";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";
import ActionAlert from "../common/display/ActionAlert";

function Plans({ handleSelectPlan, productsErrors, products }) {
  return (
    <React.Fragment>
      <Grid
        spacing={4}
        direction="row"
        pt={10}
        pb={10}
        justifyContent="center"
        container
      >
        <Grid item xs={12} sm={12} md={8}>
          <Box>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "primary.main",
                letterSpacing: 3,
                typography: { xs: "h4", sm: "h4", md: "h3", lg: "h2" },
              }}
              variant="h2"
            >
              Plans
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {productsErrors && (
        <Grid mt={2} mb={1} justifyContent="center" container spacing={1}>
          <Grid item xs={12}>
            <ActionAlert
              severity="error"
              message={productsErrors.message}
              openAlert={true}
            />
          </Grid>
        </Grid>
      )}

      <Grid
        spacing={4}
        sx={{ textAlign: "center" }}
        direction="row"
        pb={10}
        container
      >
        {products &&
          products.all_product_choices.length > 0 &&
          products.all_product_choices.map((plan) => (
            // Premium card is full width at sm breakpoint
            <Grid
              item
              key={plan.id}
              xs={12}
              sm={plan.name === "Premium" ? 12 : 6}
              md={4}
            >
              <Card sx={{ minHeight: "350px" }}>
                <CardHeader
                  title={plan.name}
                  titleTypographyProps={{ align: "center" }}
                  action={plan.name === "Starter" ? <StarIcon /> : null}
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
                      ${plan.prices[0].price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <Box>
                    <List>
                      {plan.descriptions.map((line) => (
                        <ListItem key={line.description} disablePadding>
                          <ListItemButton>
                            <ListItemText primary={line.description} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={(e) => {
                      handleSelectPlan(e, plan.name);
                    }}
                    variant={"outlined"}
                    id="checkout-and-portal-button"
                    type="submit"
                    fullWidth
                  >
                    Sign up for free
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </React.Fragment>
  );
}

export default Plans;
