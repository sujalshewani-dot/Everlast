
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "everlast-cart";

function readSavedCart() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readSavedCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Cart remains usable if browser storage is unavailable.
    }
  }, [items]);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product || product.soldOut) return;

    const productKey = product.routeId || product.productId || product.id;
    const key = product.selectedSize
      ? `${productKey}-${product.selectedSize}`
      : productKey;
    const qty = Math.max(1, Math.floor(Number(quantity) || 1));

    setItems((current) => {
      const existing = current.find((item) => item.cartKey === key);

      if (existing) {
        return current.map((item) =>
          item.cartKey === key
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          cartKey: key,
          quantity: qty,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((key) => {
    setItems((current) =>
      current.filter((item) => item.cartKey !== key)
    );
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    const qty = Math.floor(Number(quantity));

    if (!Number.isFinite(qty) || qty < 1) return;

    setItems((current) =>
      current.map((item) =>
        item.cartKey === key
          ? { ...item, quantity: qty }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const cartTotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + Number(item.price || 0) * item.quantity,
        0
      ),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
    }),
    [
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
