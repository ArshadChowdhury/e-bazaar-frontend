import Image from "next/image";

import { toast } from "react-hot-toast";

import APIKit from "@/common/APIKit";
import { useState } from "react";

export default function ProductCard({
  product,
  cartResponse,
  cartReFetch,
}: any) {
  const [isLoading, setIsLoading] = useState(false);
  const foundProductNamesAndId: any = [];

  cartResponse?.map((cartItem: any) => {
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
    setIsLoading(true);
    if (found.quantity > 1) {
      const handleSuccess = () => {
        cartReFetch();
        setIsLoading(false);
      };

      const handleFailure = (error: Object) => {
        console.log(error);
      };

      const promise = APIKit.cart
        .editCartProductQuantity(found.id, {
          quantity: found.quantity > 0 ? parseInt(found.quantity) - 1 : null,
        })
        .then(handleSuccess)
        .catch(handleFailure);

      return toast.promise(promise, {
        loading: "Updating product in cart...",
        success: "Quantity updated in cart",
        error: "Quantity wasn't updated to cart",
      });
    } else {
      const handleSuccess = () => {
        cartReFetch();
        setIsLoading(false);
      };

      const handleFailure = (error: Object) => {
        console.log(error);
      };

      const promise = APIKit.cart
        .deleteCartProduct(found.id)
        .then(handleSuccess)
        .catch(handleFailure);

      return toast.promise(promise, {
        loading: "Deleting product from cart...",
        success: "Product deleted from cart",
        error: "Product deletion failed",
      });
    }
  };

  const handleIncreaseInCart = (found: any) => {
    setIsLoading(true);
    if (found) {
      const handleSuccess = () => {
        cartReFetch();
        setIsLoading(false);
      };

      const handleFailure = (error: Object) => {
        console.log(error);
      };

      const promise = APIKit.cart
        .editCartProductQuantity(found.id, {
          quantity: parseInt(found.quantity) + 1,
        })
        .then(handleSuccess)
        .catch(handleFailure);

      return toast.promise(promise, {
        loading: "Updating product in cart...",
        success: "Quantity updated in cart",
        error: "Quantity wasn't updated to cart",
      });
    }
  };

  const handleAddToCart = (product: any) => {
    setIsLoading(true);
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
      const handleSuccess = () => {
        cartReFetch();
        setIsLoading(false);
      };

      const handleFailure = (error: Object) => {
        console.log(error);
      };

      const promise = APIKit.cart
        .editCartProductQuantity(found.id, {
          quantity: parseInt(found.quantity) + 1,
        })
        .then(handleSuccess)
        .catch(handleFailure);

      return toast.promise(promise, {
        loading: "Updating product in cart...",
        success: "Quantity updated in cart",
        error: "Quantity wasn't updated to cart",
      });
    } else {
      const handleSuccess = () => {
        cartReFetch();
        setIsLoading(false);
      };

      const handleFailure = (error: Object) => {
        console.log(error);
      };

      const promise = APIKit.cart
        .addProductInCart(payload)
        .then(handleSuccess)
        .catch(handleFailure);

      return toast.promise(promise, {
        loading: "Adding product in cart...",
        success: "Product added to cart",
        error: "Product wasn't added to cart",
      });
    }
  };

  let hasDiscount = false;

  // Convert the date strings to Date objects
  const startDate = new Date(product.discount_startDate);
  const endDate = new Date(product.discount_endDate);

  // Get the current date
  const currentDate = new Date();

  // Check if the current date is within the discount period
  if (currentDate >= startDate && currentDate <= endDate) {
    hasDiscount = true;
  }

  return (
    <>
      <div className="border border-light-gray p-4">
        <div className="flex justify-center object-cover">
          <Image
            className="rounded-md w-full h-auto"
            src={"https://picsum.photos/200/200" || "/assets/placeholder.png"}
            height={200}
            width={500}
            placeholder="blur"
            blurDataURL={"/assets/placeholder.png"}
            alt="product-image"
          />
        </div>
        <div className="flex flex-col gap-1 py-5">
          <span className="text-base font-semibold">{product.name}</span>
          <div className="flex gap-2 items-center">
            <span className="text-lg text-gray-600 font-semibold">
              $
              {hasDiscount
                ? Math.ceil(
                    parseInt(product.price) -
                      (parseInt(product.price) * 25) / 100
                  )
                : product.price}
            </span>
            {hasDiscount ? (
              <span className="text-sm text-gray-600 line-through">
                {product.price}
              </span>
            ) : null}
          </div>

          <div className="flex">
            {found?.quantity >= 1 ? (
              <div className="bg-dark-sky flex items-center gap-3 rounded-md text-white px-4 py-1">
                <button
                  disabled={isLoading}
                  onClick={() => handleDeleteFromCart(found)}
                >
                  -
                </button>
                <span className="text-lg">{found.quantity}</span>
                <button
                  disabled={isLoading}
                  onClick={() => handleIncreaseInCart(found)}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                disabled={isLoading}
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
