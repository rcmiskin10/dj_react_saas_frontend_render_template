import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import axios from "axios";
import React from "react";
import ReactGA from "react-ga4";
import { useNavigate } from "react-router-dom";
import Features from "../components/landingpage/Features";
import Hero from "../components/landingpage/Hero";
import HowItWorks from "../components/landingpage/HowItWorks";
import NewsletterSignup from "../components/landingpage/NewsletterSignup";
import Plans from "../components/landingpage/Plans";
import Section from "../components/landingpage/Section";
import SocialMediaLinks from "../components/landingpage/SocialMediaLinks";
import * as settings from "../settings";

const initialState = {
  email: "",
};

function LandingPage() {
  const navigate = useNavigate();
  const [landingPageData, setLandingPageData] = React.useState(null);
  const [products, setProducts] = React.useState(null);

  const [isNewsletterSignupSuccess, setIsNewsletterSignupSuccess] =
    React.useState(false);
  const [error, setError] = React.useState(null);
  const [productsErrors, setProductsErrors] = React.useState(null);

  const [{ email }, setState] = React.useState(initialState);
  const mediaUrl =
    settings.ENV === "production" ? "" : `${settings.API_SERVER}`;
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    retrieveLandingPageData();
    retrieveproducts();
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignupForNewsletter = (e) => {
    e.preventDefault();
    setLoading(true);
    signupForNewsletter();
    setLoading(false);
  };

  const handleSelectPlan = (event, plan) => {
    event.preventDefault();
    // Track a custom event
    ReactGA.event({
      category: "Sign Up For Free Button",
      action: `Clicked on ${plan} plan`,
      label: "Plans",
    });
    navigate("/signup");
  };

  const signupForNewsletter = async () => {
    setError("");
    setIsNewsletterSignupSuccess(false);

    return await axios
      .post(
        `${settings.API_SERVER}/api/landingpage/newsletter-signup/`,
        {
          email: email,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (res) {
        if (res) {
          setIsNewsletterSignupSuccess(true);
          setState(initialState);
        }
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          setError(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          setError("The request was made but no response was received.");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError("Error: " + error.message);
        }
        return false;
      });
  };

  const retrieveLandingPageData = () => {
    axios
      .get(`${settings.API_SERVER}/api/landingpage/get-landingpage-data/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLandingPageData(res.data.landing_page);
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

  const retrieveproducts = () => {
    axios
      .get(`${settings.API_SERVER}/api/payments/retrieve-all-products/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          setProductsErrors(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          setProductsErrors(
            "The request was made but no response was received."
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          setProductsErrors("Error: " + error.message);
        }
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container sx={{ pt: 8, pb: 6 }} maxWidth="lg" component="main">
        <Hero landingPageData={landingPageData} mediaUrl={mediaUrl} />
        <Divider sx={{ paddingTop: 5 }} />
        <Features landingPageData={landingPageData} />
        <Divider sx={{ paddingTop: 5 }} />
        <Section landingPageData={landingPageData} mediaUrl={mediaUrl} />
        <Divider sx={{ paddingTop: 5 }} />
        <Plans
          handleSelectPlan={handleSelectPlan}
          productsErrors={productsErrors}
          products={products}
        />
        <Divider sx={{ paddingTop: 5 }} />
        <HowItWorks landingPageData={landingPageData} navigate={navigate} />
        <Divider sx={{ paddingTop: 5 }} />
        <NewsletterSignup
          handleOnChange={handleOnChange}
          handleSignupForNewsletter={handleSignupForNewsletter}
          error={error}
          email={email}
          isNewsletterSignupSuccess={isNewsletterSignupSuccess}
          loading={loading}
        />
        <Divider sx={{ paddingTop: 5 }} />
        <SocialMediaLinks
          landingPageData={landingPageData}
          openInNewTab={openInNewTab}
        />
      </Container>
    </React.Fragment>
  );
}

export default LandingPage;
