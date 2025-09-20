import { createContext, useContext, useEffect, useReducer } from 'react';
import { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  cart: CartItem[];
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartItem[] };

const initialState: CartState = {
  cart: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product, quantity }],
      };
    }
    case 'REMOVE_FROM_CART': {
      const { productId } = action.payload;
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== productId),
      };
    }
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      };
    }
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  total: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = state.cart.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0);

  const value = {
    cart: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};