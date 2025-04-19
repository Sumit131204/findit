import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Avatar,
  styled,
} from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LaptopIcon from "@mui/icons-material/Laptop";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import RingVolumeIcon from "@mui/icons-material/RingVolume";
import { Item } from "../types";
import { useItems } from "../context/ItemsContext";

interface ItemCardProps {
  item: Item;
  selected?: boolean;
  onClick?: () => void;
}

const StyledCard = styled(Card)<{ selected?: boolean }>(({ selected }) => ({
  marginBottom: "16px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  border: selected ? "2px solid #3355DD" : "1px solid #e0e0e0",
  boxShadow: selected
    ? "0 4px 8px rgba(0,0,0,0.2)"
    : "0 1px 3px rgba(0,0,0,0.1)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
  },
}));

const getIconByType = (type: string) => {
  switch (type) {
    case "Mobile":
      return <PhoneAndroidIcon />;
    case "Laptop":
      return <LaptopIcon />;
    case "Wallet":
      return <AccountBalanceWalletIcon />;
    case "Bike":
      return <DirectionsBikeIcon />;
    default:
      return <PhoneAndroidIcon />;
  }
};

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  selected = false,
  onClick,
}) => {
  const { ringItem, loading } = useItems();

  const handleRingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    ringItem(item.id);
  };

  return (
    <StyledCard selected={selected} onClick={onClick}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: selected ? "#3355DD" : "#f5f5f5",
                color: selected ? "white" : "#3355DD",
                marginRight: 2,
              }}
            >
              {getIconByType(item.type)}
            </Avatar>
            <Box>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.type}
              </Typography>
            </Box>
          </Box>

          <Box>
            {item.distance !== undefined && (
              <Chip
                label={`${item.distance} ${
                  item.distance === 1 ? "meter" : "meters"
                } away`}
                size="small"
                color={
                  item.distance < 2
                    ? "success"
                    : item.distance < 5
                    ? "primary"
                    : "error"
                }
                sx={{ mr: 1 }}
              />
            )}
            <IconButton
              color="primary"
              onClick={handleRingClick}
              disabled={loading}
            >
              <RingVolumeIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
          Last seen:{" "}
          {item.lastSeen ? new Date(item.lastSeen).toLocaleString() : "Unknown"}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default ItemCard;
