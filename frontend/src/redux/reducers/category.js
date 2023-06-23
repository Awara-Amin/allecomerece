import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const categoryReducer = createReducer(initialState, {
  categoryCreateRequest: (state) => {
    state.isLoading = true;
  },
  categoryCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.category = action.payload;
    state.success = true;
  },
  categoryCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all categorys of shop
  getAllCategoriesShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllCategoriesShopSuccess: (state, action) => {
    state.isLoading = false;
    state.categories = action.payload;
  },
  getAllCategoriesShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete category of a shop
  deleteCategoryRequest: (state) => {
    state.isLoading = true;
  },
  deleteCategorySuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteCategoryFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all categories
  getAllCategoriesRequest: (state) => {
    state.isLoading = true;
  },
  getAllCategoriesSuccess: (state, action) => {
    state.isLoading = false;
    // state.allCategories = action.payload;
    state.categories = action.payload;
  },
  getAllCategoriesFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // update Categories
  updateCategoryRequest: (state) => {
    state.isLoading = true;
  },
  updateCategorySuccess: (state, action) => {
    state.isLoading = false;
    state.category = action.payload;
    state.success = true;
  },
  updateCategoryFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // one is enough
  clearErrors: (state) => {
    state.error = null;
  },
});
