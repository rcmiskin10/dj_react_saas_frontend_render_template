import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/common/layout/Layout";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CreateLandingPage from "./pages/CreateLandingPage";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Account from "./pages/account/Account";

import Billing from "./pages/account/Billing";
import CurrentPlan from "./pages/account/CurrentPlan";
import ForgotPassword from "./pages/account/ForgotPassword";
import Login from "./pages/account/Login";
import Profile from "./pages/account/Profile";
import ResetPassword from "./pages/account/ResetPassword";
import SignUp from "./pages/account/SignUp";
import UpdatePlan from "./pages/account/UpdatePlan";
import { AuthContext, AuthProvider } from "./utils/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <></>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

const UnProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <></>;
  }

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return children;
};

function App(props) {
  const ELEMENTS_OPTIONS = {
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
      },
    ],
  };

  const [stripePromise] = useState(() =>
    loadStripe(process.env.REACT_APP_STRIPE_API_TEST_PK)
  );

  useEffect(() => {}, []);

  return (
    <div className="App">
      {
        <AuthProvider>
          <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
            <Layout {...props}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <UnProtectedRoute>
                      <LandingPage {...props} />
                    </UnProtectedRoute>
                  }
                />
                <Route
                  path="forgot-password"
                  element={
                    <UnProtectedRoute>
                      <ForgotPassword {...props} />
                    </UnProtectedRoute>
                  }
                />
                <Route
                  path="reset-password"
                  element={
                    <UnProtectedRoute>
                      <ResetPassword {...props} />
                    </UnProtectedRoute>
                  }
                />
                <Route
                  path="signup"
                  element={
                    <UnProtectedRoute>
                      <SignUp {...props} />
                    </UnProtectedRoute>
                  }
                />
                <Route
                  path="login"
                  element={
                    <UnProtectedRoute>
                      <Login {...props} />
                    </UnProtectedRoute>
                  }
                />
                <Route path="blog" element={<Blog {...props} />} />
                <Route
                  path="blog/post/:postId"
                  element={<BlogPost {...props} />}
                />

                <Route
                  path="home"
                  element={
                    <ProtectedRoute>
                      <Home {...props} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="create-landing-page"
                  element={
                    <ProtectedRoute>
                      <CreateLandingPage {...props} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="account"
                  element={
                    <ProtectedRoute>
                      <Account {...props} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="account/billing"
                  element={
                    <ProtectedRoute>
                      <Billing {...props} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="account/current-plan"
                  element={
                    <ProtectedRoute>
                      <CurrentPlan {...props} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="account/update-plan"
                  element={
                    <ProtectedRoute>
                      <UpdatePlan {...props} />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="account/profile"
                  element={
                    <ProtectedRoute>
                      <Profile {...props} />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Layout>
          </Elements>
        </AuthProvider>
      }
    </div>
  );
}

export default App;
