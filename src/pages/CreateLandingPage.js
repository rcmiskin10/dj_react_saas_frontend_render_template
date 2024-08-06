import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Container, TextField, Typography } from "@mui/material/";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import React from "react";
import ActionAlert from "../components/common/display/ActionAlert";
import api from "../services/Api.js";

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

const initialMainState = {
  subdomain: "",
  businessName: "",
  logo: null,
  heroTitle: "",
  heroSubTitle: "",
  heroImage: null,
};

const initialFeatureState = {
  featureTitle: "",
  featureDescription: "",
};

function CreateLandingPage() {
  const [showFeatureInput, setShowFeatureInput] = React.useState(false);
  const [featureList, setFeatureList] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [icons, setIcons] = React.useState([]);
  const [featureIcon, setFeatureIcon] = React.useState("X");
  const [
    { subdomain, businessName, logo, heroTitle, heroSubTitle, heroImage },
    setMainState,
  ] = React.useState(initialMainState);

  const [{ featureTitle, featureDescription }, setFeatureState] =
    React.useState(initialFeatureState);

  React.useEffect(() => {
    getIcons();
  }, [icons]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setMainState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnFeatureChange = (e) => {
    const { name, value } = e.target;
    setFeatureState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddFeature = (featureTitle, featureDescription, featureIcon) => {
    const icon_svg = icons.find((i) => i.icon_name === featureIcon).svg;
    const newFeature = {
      feature_title: featureTitle,
      feature_description: featureDescription,
      feature_icon_svg: icon_svg,
    };

    setFeatureList((prevFeatureList) => [...prevFeatureList, newFeature]);
    setFeatureState((prevState) => ({
      ...prevState,
      featureTitle: "",
      featureDescription: "",
    }));

    setFeatureIcon("X");
    console.log(icons.length);
    if (icons.length === 6) {
      setShowFeatureInput(false);
    }
  };

  const handleOnFeatureIconChange = (event) => {
    setFeatureIcon(event.target.value);
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

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container spacing={2}>
        <Container
          disableGutters
          maxWidth="md"
          component="main"
          sx={{ pt: 10, pb: 5, color: "primary.main" }}
        >
          <Typography component="h1" variant="h2" align="center" gutterBottom>
            Create Landing Page
          </Typography>
        </Container>
        <Grid item xs={6}>
          <Container sx={{ pb: 15 }} component="main">
            <Box>
              <Typography variant="h6" component="h2">
                Enter details for your landing page!
              </Typography>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { mt: 6, width: "100%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  id="subdomain"
                  label="Subdomain"
                  name="subdomain"
                  sx={{ mt: 6 }}
                  onChange={handleOnChange}
                  value={subdomain}
                />
                <TextField
                  required
                  id="business-name"
                  label="Business Name"
                  name="businessName"
                  sx={{ mt: 6 }}
                  onChange={handleOnChange}
                  value={businessName}
                />
                <InputLabel sx={{ mt: 6 }} htmlFor="logo-image">
                  Add a Logo
                </InputLabel>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  sx={{ mt: 2 }}
                >
                  Upload Logo Image
                  <VisuallyHiddenInput
                    accept="image/*"
                    id="logo"
                    multiple
                    type="file"
                    name="logo"
                    value={logo}
                    onChange={handleOnChange}
                  />
                </Button>

                <TextField
                  required
                  id="hero-title"
                  label="Hero Title"
                  name="heroTitle"
                  sx={{ mt: 6 }}
                  onChange={handleOnChange}
                  value={heroTitle}
                />
                <TextField
                  required
                  id="hero-subtitle"
                  label="Hero Sub Title"
                  name="heroSubTitle"
                  sx={{ mt: 6 }}
                  onChange={handleOnChange}
                  value={heroSubTitle}
                />
                <InputLabel sx={{ mt: 6 }} htmlFor="hero-image">
                  Add a Hero Image
                </InputLabel>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  sx={{ mt: 2 }}
                >
                  Upload Hero Image
                  <VisuallyHiddenInput
                    accept="image/*"
                    id="hero-image"
                    multiple
                    type="file"
                    name="heroImage"
                    value={heroImage}
                    onChange={handleOnChange}
                  />
                </Button>

                <InputLabel sx={{ mt: 6, mb: 6 }} htmlFor="features">
                  Add 3 or more Features
                </InputLabel>

                {!showFeatureInput && (
                  <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    endIcon={<AddCircleOutlineIcon />}
                    onClick={() => setShowFeatureInput(true)}
                  >
                    Add Feature
                  </Button>
                )}

                <Box sx={{ mt: 2 }}>
                  {featureList.length > 0 && (
                    <Grid
                      container
                      spacing={{ xs: 1 }}
                      columns={{ xs: 1, sm: 1, md: 6 }}
                      sx={{ mt: 2 }}
                    >
                      {featureList.map((feature) => (
                        <Grid item xs={1} sm={1} md={2} key={feature.id}>
                          <Box>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: feature.feature_icon_svg,
                              }}
                            />

                            <Typography>{feature.feature_title}</Typography>
                            <Typography>
                              {feature.feature_description}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>

                {showFeatureInput && (
                  <Box
                    sx={{
                      mt: 2,
                      width: { xs: "100%", sm: "100%", md: "33%" },
                    }}
                  >
                    <TextField
                      required
                      id="feature-title"
                      label="Feature Title"
                      name="featureTitle"
                      sx={{ mt: 2 }}
                      onChange={handleOnFeatureChange}
                      value={featureTitle}
                      fullWidth
                    />
                    <TextField
                      multiline
                      maxRows={10}
                      required
                      id="feature-description"
                      label="Feature Description"
                      name="featureDescription"
                      sx={{ mt: 2 }}
                      onChange={handleOnFeatureChange}
                      value={featureDescription}
                      fullWidth
                    />
                    <Select
                      sx={{ mt: 2 }}
                      id="feature-icon"
                      value={featureIcon}
                      onChange={handleOnFeatureIconChange}
                      label="Select a Feature Icon"
                      name="featureIcon"
                      required
                      fullWidth
                    >
                      {icons.map((option) => (
                        <MenuItem key={option.id} value={option.icon_name}>
                          <Box>
                            <div>{option.icon_name}</div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: option.svg,
                              }}
                            />
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                    <Box sx={{ mt: 2 }}>
                      <IconButton
                        onClick={() =>
                          handleAddFeature(
                            featureTitle,
                            featureDescription,
                            featureIcon
                          )
                        }
                        color="primary"
                        aria-label="add feature"
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {}}
                  sx={{ mt: 6, mr: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {}}
                  sx={{ mt: 6 }}
                >
                  Submit
                </Button>
                {error && error.length > 0 && (
                  <Grid mt={2} justifyContent="center" container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <ActionAlert
                        severity="error"
                        message={error}
                        openAlert={true}
                      />
                    </Grid>
                  </Grid>
                )}
                {error && (
                  <Grid
                    mt={2}
                    mb={1}
                    justifyContent="center"
                    container
                    spacing={1}
                  >
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <ActionAlert
                        severity="error"
                        message={error.message}
                        openAlert={true}
                      />
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container sx={{ pb: 15 }} component="main">
            <Box>
              <Typography variant="h6" component="h2">
                Preview
              </Typography>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CreateLandingPage;
