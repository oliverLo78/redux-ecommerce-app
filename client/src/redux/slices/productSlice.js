// Import createSlice: createSlice is used to create Redux slices 
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  products: [],
  currentCategory: null,
  totalPrice: 0,
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
      state.totalPrice -= state.products[index].price;
      state.products.splice(index, 1);
    },
  },
});

export const { addProduct, removeProduct, updateProducts, setCurrentCategory  } = productSlice.actions;
export default productSlice.reducer;
