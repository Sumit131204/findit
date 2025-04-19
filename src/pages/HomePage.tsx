import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Tabs,
  Tab,
  Divider,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PaidIcon from "@mui/icons-material/Paid";
import { useItems } from "../context/ItemsContext";
import ItemCard from "../components/ItemCard";

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: "linear-gradient(135deg, #3355DD 0%, #5577EE 100%)",
  borderRadius: "16px",
  padding: "40px",
  color: "white",
  marginBottom: "32px",
  position: "relative",
  overflow: "hidden",
}));

const HeroImage = styled(Box)({
  position: "absolute",
  right: "20px",
  bottom: "0",
  width: "200px",
  height: "200px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom right",
});

const ActionButton = styled(Button)({
  borderRadius: "24px",
  padding: "10px 24px",
  fontWeight: "bold",
  textTransform: "none",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
});

const HomePage: React.FC = () => {
  const { items, selectItem, selectedItem } = useItems();
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleItemClick = (id: string) => {
    selectItem(id);
    navigate("/map");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <HeroSection>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 58.33%" } }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Easily Find Your Lost Item
            </Typography>
            <Typography variant="body1" paragraph>
              Attach our Bluetooth tracker to your valuables and never lose them
              again. Locate your items on a map with just a tap.
            </Typography>
            <ActionButton
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<AddIcon />}
              sx={{ mt: 2, bgcolor: "white", color: "#3355DD" }}
            >
              Track new
            </ActionButton>
          </Box>
        </Box>
        <HeroImage
          sx={{
            backgroundImage: `url('https://www.pngall.com/wp-content/uploads/5/Search-PNG-Free-Image.png')`,
          }}
        />
      </HeroSection>

      <Paper
        elevation={0}
        sx={{ mb: 4, p: 3, borderRadius: "12px", border: "1px solid #eee" }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Select Item
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box
              sx={{
                flex: "1 1 calc(50% - 8px)",
                minWidth: { xs: "calc(50% - 8px)", sm: "calc(25% - 12px)" },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                <Box sx={{ fontSize: "24px", mb: 1 }}>📱</Box>
                <Typography variant="body2">Mobile</Typography>
              </Paper>
            </Box>
            <Box
              sx={{
                flex: "1 1 calc(50% - 8px)",
                minWidth: { xs: "calc(50% - 8px)", sm: "calc(25% - 12px)" },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                <Box sx={{ fontSize: "24px", mb: 1 }}>💻</Box>
                <Typography variant="body2">Laptop</Typography>
              </Paper>
            </Box>
            <Box
              sx={{
                flex: "1 1 calc(50% - 8px)",
                minWidth: { xs: "calc(50% - 8px)", sm: "calc(25% - 12px)" },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                <Box sx={{ fontSize: "24px", mb: 1 }}>👛</Box>
                <Typography variant="body2">Wallet</Typography>
              </Paper>
            </Box>
            <Box
              sx={{
                flex: "1 1 calc(50% - 8px)",
                minWidth: { xs: "calc(50% - 8px)", sm: "calc(25% - 12px)" },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                <Box sx={{ fontSize: "24px", mb: 1 }}>🚲</Box>
                <Typography variant="body2">Bike</Typography>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Tracked items section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5">Your Items</Typography>
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
            sx={{ width: "200px" }}
          />
        </Box>

        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              selected={selectedItem?.id === item.id}
              onClick={() => handleItemClick(item.id)}
            />
          ))
        ) : (
          <Paper sx={{ p: 3, textAlign: "center", bgcolor: "#f9f9f9" }}>
            <Typography variant="body1" color="text.secondary">
              No items found. Add a new item to start tracking.
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Final payment section */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: "16px",
          backgroundImage: "linear-gradient(135deg, #FFD54F 0%, #FFA000 100%)",
          color: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 66.67%" } }}>
            <Typography variant="h6" fontWeight="bold">
              Final payment: ₹170
            </Typography>
            <Typography variant="body2">
              Includes 1 tracker device and 6 months premium tracking
            </Typography>
          </Box>
          <Box
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 33.33%" },
              textAlign: { xs: "center", sm: "right" },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              endIcon={<PaidIcon />}
              sx={{
                bgcolor: "white",
                color: "#FFA000",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                },
              }}
            >
              Buy Now
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;
