// Imort createSlice: createSlice isw used to create Redux slices 
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
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
    removeProduct: (state, action) => {
      const index = state.products.findIndex(item => item.id === action.payload);
      state.totalPrice -= state.products[index].price;
      state.products.splice(index, 1);
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
