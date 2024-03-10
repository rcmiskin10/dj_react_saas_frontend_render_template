import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import ActionAlert from "../components/common/display/ActionAlert";
import * as settings from "../settings";

function Blog() {
  const [post, setPost] = React.useState(null);
  const [error, setError] = React.useState(null);
  const { postId } = useParams();

  React.useEffect(() => {
    retrievePost(postId);
  }, [postId]);

  const mediaUrl =
    settings.ENV === "production" ? "" : `${settings.API_SERVER}`;

  const retrievePost = (postId) => {
    axios
      .get(
        `${settings.API_SERVER}/api/blog/retrieve-post/`,
        {
          params: { post_id: postId },
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setPost(res.data.post);
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
      {error && (
        <Grid mt={2} mb={1} justifyContent="center" container spacing={1}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <ActionAlert
              severity="error"
              message={error.message}
              openAlert={true}
            />
          </Grid>
        </Grid>
      )}
      {post && (
        <Container maxWidth="md" sx={{ pt: 8, pb: 15 }} component="main">
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} sm={12}>
              <Typography
                component="h1"
                variant="h2"
                sx={{ wordWrap: "break-word", color: "primary.main" }}
                align="left"
                gutterBottom
              >
                {post.title}
              </Typography>
              <Paper
                sx={{
                  position: "relative",
                  backgroundColor: "grey.800",
                  color: "#fff",
                  mb: 4,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundImage: `url(${mediaUrl}${post.cover})`,
                  minHeight: 500,
                }}
              />

              <Typography
                variant="body1"
                gutterBottom
                dangerouslySetInnerHTML={{
                  __html: `${post.html_content_body}`,
                }}
              ></Typography>
            </Grid>
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
}

export default Blog;
