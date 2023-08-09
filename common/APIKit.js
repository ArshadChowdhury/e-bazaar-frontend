import HTTPKit, { request } from "./HTTPKit";

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
  },
};

export default APIKit;
