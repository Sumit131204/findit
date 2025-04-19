import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#ffffff",
  color: "#000000",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
});

const Logo = styled(Typography)({
  fontWeight: "bold",
  marginRight: "20px",
  display: "flex",
  alignItems: "center",
  "& span": {
    color: "#FF5722",
  },
});

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { authState, logout } = useAuth();
  const { isAuthenticated } = authState;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Logo variant="h6" sx={{ flexGrow: 1 }}>
          Find<span>It</span>
        </Logo>

        {isAuthenticated ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/map")}>
              Map
            </Button>
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleLogout}
              sx={{ ml: 1 }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
