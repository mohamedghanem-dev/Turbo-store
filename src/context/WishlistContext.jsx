import { createContext, useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext(null);

const STORAGE_KEY = "nexusarab_wishlist";

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      toast.success("Added to wishlist!", { icon: "♡" });
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast("Removed from wishlist", { icon: "💔" });
  };

  const toggleWishlist = (product) => {
    if (items.some((item) => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (id) => items.some((item) => item.id === id);

  const totalItems = useMemo(() => items.length, [items]);

  const value = {
    items,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    totalItems,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
};
