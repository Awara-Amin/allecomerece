import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );
    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// get A Product
export const getAProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAProductRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-a-product-for-edit/${id}`
    );
    console.log("data inside actions of Redux");
    console.log(data);
    dispatch({
      type: "getAProductSuccess",
      // payload: data.products,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAProductFailed",
      payload: error.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};

// prooduct update information
export const updateProductInformation = (product) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProductInfoRequest",
      payload: product,
    });

    const { data } = await axios.put(
      `${server}/product/update-product-info/${product._id}`,
      product,
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
    dispatch({
      type: "updateProductInfoSuccess",
      // payload: data.user,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "updateProductInfoFailed",
      payload: error.response.data.message,
    });
  }
};
