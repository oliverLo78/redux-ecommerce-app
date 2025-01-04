// Import createSlice: createSlice is used to create Redux slices 
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [], // Initialize as an empty array
  totalPrice: 0,
  currentCategory: null,  // Optional: track the current category
};

// define productSlice using createSlice function
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.totalPrice += action.payload.price;
    },
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    removeProduct: (state, action) => {
      const index = state.products.findIndex(item => item.id === action.payload);
      state.totalPrice -= state.products[index]?.price || 0;
      state.products.splice(index, 1);
    },
  },
});

export const { addProduct, updateProducts, setCurrentCategory, removeProduct } = productSlice.actions;
export default productSlice.reducer;
