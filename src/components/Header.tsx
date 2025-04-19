import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

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

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Logo variant="h6" sx={{ flexGrow: 1 }}>
          Find<span>It</span>
        </Logo>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/map")}>
            Map
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
