import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Typography, Button, styled } from "@mui/material";
import { useItems } from "../context/ItemsContext";
import { Item } from "../types";

// Fix for default markers not showing in React Leaflet
// This is needed because webpack handles assets differently

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom marker icons for different item types
const createCustomIcon = (color: string = "blue") => {
  return L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

// Map recenter component
interface MapCenterViewProps {
  position: [number, number];
  zoom?: number;
}

const MapCenterView: React.FC<MapCenterViewProps> = ({
  position,
  zoom = 13,
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, zoom);
  }, [position, zoom, map]);

  return null;
};

// Styled components
const MapWrapper = styled(Box)({
  height: "100%",
  width: "100%",
  position: "relative",
});

// Map color by item type
const getMarkerColorByType = (type: string): string => {
  switch (type) {
    case "Mobile":
      return "blue";
    case "Laptop":
      return "red";
    case "Wallet":
      return "gold";
    case "Bike":
      return "green";
    default:
      return "blue";
  }
};

const MapView: React.FC = () => {
  const { items, selectedItem, selectItem, ringItem } = useItems();
  const [center, setCenter] = useState<[number, number]>([18.6723, 73.9084]); // Alandi, Pune coordinates

  useEffect(() => {
    if (selectedItem && selectedItem.location) {
      setCenter([selectedItem.location.lat, selectedItem.location.lng]);
    } else if (items.length > 0 && items[0].location) {
      setCenter([items[0].location.lat, items[0].location.lng]);
    }
  }, [selectedItem, items]);

  return (
    <MapWrapper>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapCenterView position={center} />

        {items.map(
          (item) =>
            item.location && (
              <Marker
                key={item.id}
                position={[item.location.lat, item.location.lng]}
                icon={createCustomIcon(getMarkerColorByType(item.type))}
                eventHandlers={{
                  click: () => {
                    selectItem(item.id);
                  },
                }}
              >
                <Popup>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2">{item.type}</Typography>
                  {item.distance !== undefined && (
                    <Typography variant="body2">
                      Distance: {item.distance} meters
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => ringItem(item.id)}
                    sx={{ mt: 1 }}
                  >
                    Ring
                  </Button>
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </MapWrapper>
  );
};

export default MapView;
