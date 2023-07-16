import Image from "next/image";

import axios from "axios";
import { toast } from "react-hot-toast";

export default function ProductCard({ product, cartResponse, cartFetch }: any) {
  const foundProductNamesAndId: any = [];
  cartResponse.data?.map((cartItem: any) => {
    foundProductNamesAndId.push({
      name: cartItem.name,
      id: cartItem._id,
      quantity: cartItem.quantity,
    });
  });

  const found = foundProductNamesAndId.find((x: any) => {
    if (x.name === product.name) {
      return x;
    }
  });

  const handleDeleteFromCart = (found: any) => {
    if (found.quantity > 1) {
      return axios
        .patch(`/cart/edit/${found.id}`, {
          quantity: found.quantity > 0 ? parseInt(found.quantity) - 1 : null,
        })
        .then(function (response) {
          if (response.status == 200) {
            cartFetch();
            return toast.success("Quantity updated in cart");
          }
          return toast.error("Quantity was not updated to cart");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      return axios
        .delete(`/cart/delete/${found.id}`)
        .then(function (response) {
          if (response.status == 200) {
            cartFetch();
            return toast.success("Product deleted from cart");
          }
          return toast.error("Product deletion failed");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleIncreaseInCart = (found: any) => {
    if (found) {
      return axios
        .patch(`/cart/edit/${found.id}`, {
          quantity: parseInt(found.quantity) + 1,
        })
        .then(function (response) {
          if (response.status == 200) {
            cartFetch();
            return toast.success("Quantity updated in cart");
          }
          return toast.error("Quantity was not updated to cart");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleAddToCart = (product: any) => {
    const payload = {
      name: product.name,
      price: hasDiscount
        ? Math.ceil(
            parseInt(product.price) - (parseInt(product.price) * 25) / 100
          )
        : product.price,
      quantity: 1,
    };

    if (found) {
      return axios
        .patch(`/cart/edit/${found.id}`, {
          quantity: parseInt(found.quantity) + 1,
        })
        .then(function (response) {
          if (response.status == 200) {
            cartFetch();
            return toast.success("Quantity updated in cart");
          }
          return toast.error("Quantity was not updated to cart");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      return axios
        .post(`/cart/add-toCart`, payload)
        .then(function (response) {
          if (response.status == 201) {
            cartFetch();
            return toast.success("Product added to cart");
          }
          return toast.error("Product was not added to cart");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const todayFormatted = `${year}-0${month + 1}-${date}`;

  let hasDiscount = false;

  product.discount_startDate <= todayFormatted &&
  product.discount_endDate >= todayFormatted
    ? (hasDiscount = true)
    : (hasDiscount = false);

  return (
    <>
      <div className="border border-light-gray p-4">
        <div className="flex justify-center object-cover">
          <Image
            className="rounded-md"
            src={"https://picsum.photos/200/200"}
            height={200}
            width={500}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-1 py-5">
          <span className="text-base font-semibold">{product.name}</span>
          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold">
              $
              {hasDiscount
                ? Math.ceil(
                    parseInt(product.price) -
                      (parseInt(product.price) * 25) / 100
                  )
                : product.price}
            </span>
            {hasDiscount ? (
              <span className="text-sm text-mid-gray line-through">
                {product.price}
              </span>
            ) : null}
          </div>
          <div className="flex">
            {found?.quantity >= 1 ? (
              <div className="bg-dark-sky flex items-center gap-3 rounded-md text-white px-4 py-1">
                <button onClick={() => handleDeleteFromCart(found)}>-</button>
                <span className="text-lg">{found.quantity}</span>
                <button onClick={() => handleIncreaseInCart(found)}>+</button>
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(product)}
                className="border border-light-gray rounded-md px-4 py-2 text-sm text-dark-gray"
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
