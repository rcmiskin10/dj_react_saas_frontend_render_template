import { Button, Container, Grid, Paper, Typography } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api.js";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", sm: "100%", md: "75%", lg: "75%" },
  bgcolor: "background.paper",
  border: "1px solid primary.secondary",
  p: 4,
  overflow: "scroll",
  height: "90%",
  display: "block",
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const initialState = {
  subdomain: "",
  businessName: "",
  heroTitle: "",
  heroSubTitle: "",
  heroImage: null,
  featureTitle: "",
  featureDescription: "",
  featureIcon: "",
};

function Home() {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [showFeatureInput, setShowFeatureInput] = React.useState(false);
  const [featureList, setFeatureList] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [icons, setIcons] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [
    {
      subdomain,
      businessName,
      heroTitle,
      heroSubTitle,
      heroImage,
      featureTitle,
      featureDescription,
      featureIcon,
    },
    setState,
  ] = React.useState(initialState);

  React.useEffect(() => {
    getIcons();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddFeature = (featureTitle, featureDescription, featureIcon) => {
    console.log(featureIcon);
    const icon_svg = icons.find((i) => i.icon_name === featureIcon).svg;
    console.log(icon_svg);
    const newFeature = {
      feature_title: featureTitle,
      feature_description: featureDescription,
      feature_icon_svg: icon_svg,
    };
    setFeatureList((prevFeatureList) => [...prevFeatureList, newFeature]);
    setState((prevState) => ({
      ...prevState,
      featureTitle: "",
      featureDescription: "",
      featureIcon: icons[0].icon_name,
    }));
  };

  const getIcons = async () => {
    return await api
      .get(`/landingpage/get-icons/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.icons);
        setIcons(res.data.icons);
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

  const generateLandingPage = async (selectedProductId) => {
    return await api
      .post("/payments/update-subscription/", {
        selected_product_id: selectedProductId,
      })
      .then((res) => {
        return res;
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

  return (
    <React.Fragment>
      <CssBaseline />

      <Container
        fixed
        sx={{
          marginTop: "15vh",
          marginBottom: "10vh",
          borderRadius: "6px",
          backgroundColor: "action.disabledBackground",
          color: "primary.main",
        }}
      >
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <Paper
              sx={{
                minHeight: 100,
                marginTop: "16px",
                marginBottom: "16px",
                padding: "16px",
                color: "primary.main",
              }}
              elevation={0}
            >
              <Typography sx={{ marginBottom: 6 }} variant="h5">
                Ideaverify
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/create-landing-page");
                }}
              >
                Create Landing Page
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                minHeight: 100,
                marginTop: "16px",
                marginBottom: "16px",
                padding: "16px",
                color: "primary.main",
              }}
              elevation={0}
            >
              <Typography variant="h5">Sites</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/test");
                }}
                sx={{ mt: 6 }}
              >
                site
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Home;
