const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Mock database for demonstration
const users = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
    phoneNumber: "+1234567890",
  },
];

const items = [
  {
    id: "1",
    userId: "1",
    name: "Mobile Phone",
    type: "Mobile",
    distance: 2,
    location: { lat: 18.5204, lng: 73.8567 },
    lastSeen: new Date(),
  },
  {
    id: "2",
    userId: "1",
    name: "Laptop",
    type: "Laptop",
    distance: 3,
    location: { lat: 18.5194, lng: 73.8547 },
    lastSeen: new Date(),
  },
  {
    id: "3",
    userId: "1",
    name: "Wallet",
    type: "Wallet",
    distance: 1.2,
    location: { lat: 18.5224, lng: 73.8587 },
    lastSeen: new Date(),
  },
  {
    id: "4",
    userId: "1",
    name: "Bike",
    type: "Bike",
    distance: 3,
    location: { lat: 18.5184, lng: 73.8557 },
    lastSeen: new Date(),
  },
];

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes

// Auth routes
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Don't send the password to client
  const { password: _, ...userWithoutPassword } = user;

  res.json({
    user: userWithoutPassword,
    token: "mock-jwt-token",
  });
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  // Check if user already exists
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: String(users.length + 1),
    name,
    email,
    password,
    phoneNumber,
  };

  users.push(newUser);

  // Don't send the password to client
  const { password: _, ...userWithoutPassword } = newUser;

  res.status(201).json({
    user: userWithoutPassword,
    token: "mock-jwt-token",
  });
});

// Items routes
app.get("/api/items", (req, res) => {
  // In a real app, you would get the userId from the JWT token
  // For simplicity, we're returning all items
  res.json(items);
});

app.post("/api/items", (req, res) => {
  const { name, type, userId } = req.body;

  const newItem = {
    id: String(items.length + 1),
    userId,
    name,
    type,
    distance: Math.random() * 5,
    location: {
      lat: 18.52 + (Math.random() * 0.01 - 0.005),
      lng: 73.85 + (Math.random() * 0.01 - 0.005),
    },
    lastSeen: new Date(),
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

app.post("/api/items/:id/ring", (req, res) => {
  const { id } = req.params;

  const item = items.find((item) => item.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  item.lastSeen = new Date();

  res.json(item);
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
