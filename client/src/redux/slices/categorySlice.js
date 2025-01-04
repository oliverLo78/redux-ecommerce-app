import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],         // Empty array to avoid undefined errors
  currentCategory: null,  // Default to null or a meaningful fallback
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.categories = action.payload;  // Update categories from API or mock data
    },
    updateCurrentCategory: (state, action) => {
      state.currentCategory = action.payload; // Update the currently selected category
    },
  },
});

export const { updateCategories, updateCurrentCategory } = categorySlice.actions;
export default categorySlice.reducer;
