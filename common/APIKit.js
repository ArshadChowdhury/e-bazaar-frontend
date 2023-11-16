import { request } from "./HTTPKit";

// Created APIKit to have access to all the api routes I wanna hit in different pages just by calling simple functions
const APIKit = {
  products: {
    getAllProducts: (params) => {
      const url = "products/all-products";
      return request.get(url, { params: params });
    },
    createProduct: (payload) => {
      const url = "products/create-product";
      return request.post(url, payload);
    },
  },
  cart: {
    getAllCartProducts: () => {
      const url = "cart/all-cartItems";
      return request.get(url);
    },
    deleteCartProduct: (uid) => {
      const url = `cart/delete/${uid}`;
      return request.delete(url);
    },
    editCartProductQuantity: (uid, payload) => {
      const url = `cart/edit/${uid}`;
      return request.patch(url, payload);
    },
    addProductInCart: (payload) => {
      const url = "cart/add-toCart";
      return request.post(url, payload);
    },
  },
};

export default APIKit;
