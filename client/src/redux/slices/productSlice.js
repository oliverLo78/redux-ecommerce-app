// Import createSlice: createSlice is used to create Redux slices 
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [], // Initialize as an empty array
  currentCategory: null,  // Optional: track the current category
};

// define productSlice using createSlice function
const productSlice = createSlice({
  name: 'product',
  initialState: { products: [], currentCategory: ''},
  reducers: {
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    }
  },
});

export const { updateProducts, setCurrentCategory } = productSlice.actions;
export default productSlice.reducer;
