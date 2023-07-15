import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ProductCard({ product, cartResponse }: any) {
  const hasDiscount = true;

  const handleAddToCart = (product: any) => {
    const payload = {
      name: product.name,
      price: product.price,
      quantity: 1,
    };

    const productNames: any = [];
    cartResponse.data?.map((cartItem: any) => productNames.push(cartItem.name));

    const checkIfIsInCart = productNames.includes(product.name);

    if (checkIfIsInCart) {
      return axios
        .patch("http://localhost:3000/edit/add-toCart", payload)
        .then(function (response) {
          if (response.status == 201) {
            return toast.success("Quantity updated in cart");
          }
          return toast.error("Quantity was not updated to cart");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      return axios
        .post("http://localhost:3000/cart/add-toCart", payload)
        .then(function (response) {
          if (response.status == 201) {
            return toast.success("Product added to cart");
          }
          return toast.error("Product was not added to cart");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

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
            <span className="text-lg font-semibold">${product.price}</span>
            {hasDiscount ? (
              <span className="text-sm text-mid-gray line-through">
                {product.price}
              </span>
            ) : null}
          </div>
          <div className="flex">
            {/* {hasDiscount && (
              <div className="bg-dark-sky flex gap-3 rounded-md text-white px-4">
                <button>-</button>
                <button>2</button>
                <button>+</button>
              </div>
            )} */}
            <button
              onClick={() => handleAddToCart(product)}
              className="border border-light-gray rounded-md px-4 py-2 text-sm text-dark-gray"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
