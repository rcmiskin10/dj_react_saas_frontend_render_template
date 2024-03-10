import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import ActionAlert from "../components/common/display/ActionAlert";
import * as settings from "../settings";

function Blog() {
  const [posts, setPosts] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    retrievePosts();
  }, []);

  const retrievePosts = () => {
    axios
      .get(`${settings.API_SERVER}/api/blog/retrieve-posts/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setPosts(res.data.posts);
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

  const handleSelectPost = (event, postId) => {
    event.preventDefault();
    navigate(`/blog/post/${postId}`);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        sx={{ pt: 10, pb: 5, color: "primary.main" }}
      >
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          Blog
        </Typography>

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
      </Container>

      <Container sx={{ pt: 8, pb: 15 }} component="main">
        <Grid container spacing={2} alignItems="flex-end">
          {posts &&
            posts.length > 0 &&
            posts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "80.25%",
                    }}
                    image={
                      settings.ENV === "production"
                        ? `${post.cover}`
                        : `${settings.API_SERVER}${post.cover}`
                    }
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography noWrap gutterBottom variant="h6" component="h2">
                      {post.title}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      Posted: {post.created_on}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={(e) => handleSelectPost(e, post.id)}
                      size="small"
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Blog;
