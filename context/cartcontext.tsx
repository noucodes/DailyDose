import React, { createContext, useContext, useState, ReactNode } from "react";

// Add stock to the MenuItem type
export type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number; // Add stock field
};

type CartItem = MenuItem & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  menuItems: MenuItem[]; // Adding menuItems to the context
  updateStock: (id: string, quantity: number) => void; // New function to update stock
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Caramel Macchiato",
      price: 79,
      stock: 50,
      image:
        "https://img.freepik.com/premium-photo/iced-caramel-macchiato-isolated-white-background_972841-72.jpg?w=740",
    },
    {
      id: "2",
      name: "Spanish Latte",
      price: 89,
      stock: 30,
      image:
        "https://img.freepik.com/premium-photo/latte-coffee-white-coffee-cup-with-plate-spoon-white-background-with-clipping-path_49558-297.jpg?w=740",
    },
    {
      id: "3",
      name: "Espresso",
      price: 59,
      stock: 45,
      image:
        "https://img.freepik.com/premium-photo/espresso-cup-white-background-ai-generated_547674-3571.jpg?w=740",
    },
    {
      id: "4",
      name: "Matcha",
      price: 89,
      stock: 45,
      image:
        "https://as1.ftcdn.net/v2/jpg/07/12/93/62/1000_F_712936279_uLYM82eb1O7sBXA3QKMZYpAUyhTRfHCm.jpg",
    },
  ]);

  // Update stock in menuItems
  const updateStock = (id: string, quantity: number) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, stock: item.stock - quantity } : item
      )
    );
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);

      // Check if there's enough stock available
      if (existing) {
        if (existing.quantity < item.stock) {
          updateStock(item.id, 1); // Decrease stock by 1 when added to cart
          return prev.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          // Optional: Notify the user that stock is exhausted
          return prev; // Do nothing if stock is exhausted
        }
      } else {
        if (item.stock > 0) {
          updateStock(item.id, 1); // Decrease stock by 1 when added to cart
          return [...prev, { ...item, quantity: 1 }];
        } else {
          // Optional: Notify the user that item is out of stock
          return prev;
        }
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const item = prev.find((item) => item.id === id);
      if (item) {
        updateStock(id, -item.quantity); // Restore stock when removed from cart
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const clearCart = () => {
    // When clearing cart, restore stock for all items
    cart.forEach((item) => updateStock(item.id, -item.quantity));
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        menuItems,
        updateStock,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
