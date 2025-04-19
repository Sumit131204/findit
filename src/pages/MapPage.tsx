import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Container,
  Button,
  Drawer,
  IconButton,
  TextField,
  InputAdornment,
  List,
  ListItem,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RingVolumeIcon from "@mui/icons-material/RingVolume";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useItems } from "../context/ItemsContext";
import MapView from "../components/MapView";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";

const drawerWidth = 300;

const MapContainer = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 134px)",
  width: "100%",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    height: "calc(100vh - 200px)",
  },
}));

const ItemDetailPanel = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  position: "absolute",
  bottom: theme.spacing(3),
  left: theme.spacing(3),
  width: "300px",
  zIndex: 1000,
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(4px)",
  [theme.breakpoints.down("sm")]: {
    width: "calc(100% - 48px)",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

const MapPage: React.FC = () => {
  const { items, selectedItem, selectItem, ringItem } = useItems();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleRingClick = () => {
    if (selectedItem) {
      ringItem(selectedItem.id);
    }
  };

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Container maxWidth="xl" sx={{ my: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleBackClick} sx={{ mr: 1 }}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="h6">My location</Typography>
          </Box>

          <Box>
            <TextField
              placeholder="Search items..."
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ mr: 1, width: { xs: "120px", sm: "200px" } }}
            />
            <Button variant="outlined" onClick={toggleDrawer} size="small">
              Items List
            </Button>
          </Box>
        </Box>

        <MapContainer>
          <MapView />

          {selectedItem && (
            <ItemDetailPanel>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {selectedItem.name}
                </Typography>
                <IconButton size="small" onClick={() => selectItem("")}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              <Typography variant="body2" sx={{ mb: 1 }}>
                {selectedItem.type}{" "}
                {selectedItem.distance !== undefined &&
                  `• ${selectedItem.distance} meters away`}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mb: 2 }}
              >
                Last seen:{" "}
                {selectedItem.lastSeen
                  ? new Date(selectedItem.lastSeen).toLocaleString()
                  : "Unknown"}
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Box sx={{ flex: "1 1 50%" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<RingVolumeIcon />}
                    onClick={handleRingClick}
                  >
                    Ring
                  </Button>
                </Box>
                <Box sx={{ flex: "1 1 50%" }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<NavigationIcon />}
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${selectedItem.location?.lat},${selectedItem.location?.lng}`
                      )
                    }
                  >
                    Directions
                  </Button>
                </Box>
              </Box>
            </ItemDetailPanel>
          )}
        </MapContainer>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer}
          PaperProps={{
            sx: { width: drawerWidth },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Your Items</Typography>
              <IconButton onClick={toggleDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              placeholder="Search items..."
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <Box>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    selected={selectedItem?.id === item.id}
                    onClick={() => {
                      selectItem(item.id);
                      toggleDrawer();
                    }}
                  />
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", mt: 4 }}
                >
                  No items found
                </Typography>
              )}
            </Box>
          </Box>
        </Drawer>
      </Container>
    </Box>
  );
};

export default MapPage;
