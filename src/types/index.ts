export interface Item {
  id: string;
  name: string;
  type: "Mobile" | "Laptop" | "Wallet" | "Bike" | string;
  distance?: number;
  lastSeen?: Date;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  items?: Item[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}
