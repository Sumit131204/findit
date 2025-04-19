import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Item } from "../types";
import { itemsAPI } from "../services/api";

interface ItemsContextType {
  items: Item[];
  selectedItem: Item | null;
  loading: boolean;
  error: string | null;
  addItem: (item: Omit<Item, "id">) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  selectItem: (id: string) => void;
  ringItem: (id: string) => Promise<void>;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemsProvider");
  }
  return context;
};

interface ItemsProviderProps {
  children: ReactNode;
}

export const ItemsProvider: React.FC<ItemsProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load items when component mounts
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedItems = await itemsAPI.getItems();
        setItems(fetchedItems);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch items");
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const addItem = async (item: Omit<Item, "id">) => {
    try {
      setLoading(true);
      const newItem = await itemsAPI.createItem(item);
      setItems((prevItems) => [...prevItems, newItem]);
      setLoading(false);
    } catch (err) {
      setError("Failed to add item");
      setLoading(false);
    }
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );

    if (selectedItem && selectedItem.id === id) {
      setSelectedItem((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));

    if (selectedItem && selectedItem.id === id) {
      setSelectedItem(null);
    }
  };

  const selectItem = (id: string) => {
    const item = items.find((item) => item.id === id);
    setSelectedItem(item || null);
  };

  const ringItem = async (id: string) => {
    setLoading(true);

    try {
      const updatedItem = await itemsAPI.ringItem(id);
      updateItem(id, { lastSeen: updatedItem.lastSeen });
      setLoading(false);
    } catch (err) {
      setError("Failed to ring the device");
      setLoading(false);
    }
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        selectedItem,
        loading,
        error,
        addItem,
        updateItem,
        deleteItem,
        selectItem,
        ringItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
