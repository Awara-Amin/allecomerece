import axios from "axios";
import { server } from "../../server";

// create category
export const createCategory = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "categoryCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/category/create-category`,
      newForm,
      config
    );
    dispatch({
      type: "categoryCreateSuccess",
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: "categoryCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get All Categories of a shop
export const getAllCategoriesShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllCategoriesShopRequest",
    });

    const { data } = await axios.get(
      `${server}/category/get-all-categories-shop/${id}`
    );
    dispatch({
      type: "getAllCategoriesShopSuccess",
      payload: data.categories,
    });
  } catch (error) {
    dispatch({
      type: "getAllCategoriesShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete category of a shop
// export const deleteCategory = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteCategoryRequest",
//     });

//     const { data } = await axios.delete(
//       `${server}/category/delete-shop-category/${id}`,
//       {
//         withCredentials: true,
//       }
//     );

//     dispatch({
//       type: "deleteCategorySuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteCategoryFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// get all Categories
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({
      // type: "getAllProductsRequest",
      type: "getAllCategoriesRequest",
    });

    const { data } = await axios.get(`${server}/category/get-all-categories`);
    console.log("inside actions-category");
    console.log(data);

    dispatch({
      type: "getAllCategoriesSuccess",
      payload: data.categories,
    });
  } catch (error) {
    dispatch({
      type: "getAllCategoriesFailed",
      payload: error.response.data.message,
    });
  }
};

// get all Categories by Id
export const getAllCategoryById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllCategoryRequest",
    });

    const { data } = await axios.get(`${server}/category/get-category/${id}`);
    dispatch({
      type: "getAllCategorySuccess",
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: "getAllCategoryFailed",
      payload: error.response.data.message,
    });
  }
};

// update Category
export const updateCategory = (category) => async (dispatch) => {
  console.log("category inside update actions");
  console.log(category);
  try {
    dispatch({
      type: "updateCategoryRequest",
    });

    const { data } = await axios.put(
      `${server}/category/update-category-name/${category.id}`,
      category,
      { withCredentials: true }
    );
    dispatch({
      type: "updateCategorySuccess",
      payload: {
        successMessage: "Category updated succesfully!",
        category: data,
      },
    });
  } catch (error) {
    dispatch({
      type: "updateCategoryFailed",
      payload: error.response.data.message,
    });
  }
};
