import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';

const store = configureStore({
    reducer: {
    cart: cartReducer,
    product: productReducer,
    category: categoryReducer,
  },
});

export default store;
