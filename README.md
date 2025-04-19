# FindIt - Bluetooth Item Tracker

FindIt is a web application for tracking items with Bluetooth trackers. Attach our Bluetooth tracker to your valuable items and never lose them again. Locate your items on a map with just a tap.

## Features

- User authentication (login/register)
- Track multiple items with Bluetooth devices
- View items on a map with accurate locations
- Ring items remotely to find them
- List of tracked items with distance information
- Mobile responsive design

## Tech Stack

### Frontend
- React.js with TypeScript
- React Router for navigation
- Material UI for components and styling
- Leaflet.js for maps
- Context API for state management

### Backend
- Node.js with Express
- RESTful API design
- Mock data for demonstration purposes

## Running the Application

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Frontend Setup

```bash
# Navigate to the project directory
cd findit

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will be available at http://localhost:3000

### Backend Setup

```bash
# Navigate to the server directory
cd findit/server

# Install dependencies
npm install

# Start the server
npm run dev
```

The backend API will be available at http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Items
- `GET /api/items` - Get all items for the authenticated user
- `POST /api/items` - Create a new item
- `POST /api/items/:id/ring` - Ring a specific item

## Project Structure

```
findit/
├── public/              # Static files
├── src/                 # Frontend source code
│   ├── components/      # Reusable components
│   ├── context/         # Context API files
│   ├── pages/           # Application pages
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── App.tsx          # Main application component
├── server/              # Backend Node.js/Express server
│   ├── server.js        # Server entry point
│   └── package.json     # Server dependencies
└── package.json         # Frontend dependencies
```

## Screenshots

1. Home Page
2. Map View with Item Locations
3. Login Page
4. Sign Up Page

## Future Improvements

- Real Bluetooth device integration
- User profile management
- Item history tracking
- Push notifications
- Mobile app (React Native)
