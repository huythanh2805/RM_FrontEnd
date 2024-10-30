
import { createContext, useContext, useReducer, useEffect } from 'react';

// type CartAction =
//   | { type: 'SET_CART'; payload: CartState }
//   | { type: 'ADD_ITEM'; payload: CartItem }
//   | { type: 'REMOVE_ITEM'; payload: { dish_id: string } }
//   | { type: 'UPDATE_QUANTITY'; payload: { dish_id: string; quantity: number } }
//   | { type: 'CLEAR_CART' };

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.dish_id === action.payload.dish_id);
      if (existingItem) {
        return state.map(item =>
          item.dish_id === action.payload.dish_id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case 'REMOVE_ITEM':
      return state.filter(item => item.dish_id !== action.payload.dish_id);
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.dish_id === action.payload.dish_id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};


const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (dish_id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { dish_id } });
  };

  const updateQuantity = (dish_id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { dish_id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
