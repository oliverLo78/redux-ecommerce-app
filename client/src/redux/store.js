import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';



const store = configureStore({
    reducer: {
    category: categoryReducer,  // Ensure this key matches how your're accessing state
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;
