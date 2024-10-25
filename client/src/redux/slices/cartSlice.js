import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Represents the cart items
  totalAmount: 0, // Total price of items in the cart
  cartOpen: false, // New Property to manage cart open/close state
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If item already exists, increase the quantity
        existingItem.purchaseQuantity += 1;
        state.totalAmount += action.payload.price;
      } else {
        // Add the new item to the cart
        state.items.push({ ...action.payload, purchaseQuantity: 1 });
        state.totalAmount += action.payload.price;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.totalAmount -= state.items[index].price * state.items[index].purchaseQuantity;
        state.items.splice(index, 1);
      }
    },
    updateCartQuantity: (state, action) => {
      const { id, purchaseQuantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.totalAmount += (purchaseQuantity - existingItem.purchaseQuantity) * existingItem.price;
        existingItem.purchaseQuantity = purchaseQuantity;
      }
    },
    addMultipleToCart: (state, action) => {
      action.payload.forEach(product => {
        const existingItem = state.items.find(item => item.id === product.id);
        if (existingItem) {
          existingItem.purchaseQuantity += product.purchaseQuantity;
        } else {
          state.items.push(product);
        }
        state.totalAmount += product.price * product.purchaseQuantity;
      });
    },
    addToCart: (state, action) => {
      state.items.push(action.payload);
      state.cartOpen = true;
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
  },
});

export const { addItem, removeFromCart, updateCartQuantity, addMultipleToCart, addToCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;

