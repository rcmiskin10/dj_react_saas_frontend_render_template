import BookIcon from "@mui/icons-material/Book";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as settings from "../../../settings";
import { AuthContext } from "../../../utils/AuthContext";

const PREFIX = "TopBar";

const classes = {
  root: `${PREFIX}-root`,
  menuButton: `${PREFIX}-menuButton`,
  title: `${PREFIX}-title`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
    paddingBottom: theme.spacing(8),
  },

  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
  },

  [`& .${classes.title}`]: {
    flexGrow: 1,
  },
}));

export default function TopBar(props) {
  const { isLoggedIn, logout } = useContext(AuthContext);
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Root className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            onClick={() => (isLoggedIn ? navigate("/home") : navigate("/"))}
            variant="h6"
            className={classes.title}
            sx={{ cursor: "pointer" }}
          >
            {settings.SITE_NAME}
          </Typography>
          {isLoggedIn ? (
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "right",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => navigate("/account")}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Account
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => navigate("/blog")}>
                  <ListItemIcon>
                    <BookIcon fontSize="small" />
                  </ListItemIcon>
                  Blog
                </MenuItem>
                <MenuItem onClick={() => logout()}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          ) : null}
          {!isLoggedIn && props.pathName !== "/blog" ? (
            <Button color="inherit" onClick={() => navigate("/blog")}>
              Blog
            </Button>
          ) : null}
          {!isLoggedIn && props.pathName !== "/login" ? (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : null}
          {!isLoggedIn && props.pathName !== "/signup" ? (
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Root>
  );
}
