import Image from "next/image";

import { toast } from "react-hot-toast";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";

import APIKit from "@/common/APIKit";

import CartDrawer from "./CartDrawer";
import EmptyState from "./EmptyState";

type Props = {
  cartOpen: boolean;
  setCartOpen: any;
  cartData: any;
  cartRefetch: any;
};

export default function Cart({
  cartOpen,
  setCartOpen,
  cartData,
  cartRefetch,
}: Props) {
  const handleCartDelete = (uid: string) => {
    // Prompting the user to make sure he wanna delete it from the cart
    const confirmed = window.confirm(
      "Are you you want to delete this from Cart ?"
    );

    if (confirmed) {
      const handleSuccess = () => {
        cartRefetch();
      };

      const handleFailure = (error: Object) => {
        console.log(error);
      };

      const promise = APIKit.cart
        .deleteCartProduct(uid)
        .then(handleSuccess)
        .catch(handleFailure);

      return toast.promise(promise, {
        loading: "Deleting product...",
        success: "Product deleted from cart",
        error: "Product deletion failed",
      });
    }
  };

  const allCartItems: any = [];
  cartData?.map((cartItem: any) =>
    allCartItems.push(parseInt(cartItem.price) * cartItem.quantity)
  );

  const subTotal = allCartItems.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue,
    0
  );

  return (
    <CartDrawer open={cartOpen} setOpen={setCartOpen}>
      <section className="max-w-lg mx-auto flex flex-col">
        <div>
          <div className="flex my-8 justify-between items-center">
            <h1 className="text-4xl font-semibold">Shopping Cart</h1>
            <XMarkIcon
              onClick={() => setCartOpen(false)}
              className="w-6 md:w-10 cursor-pointer"
            />
          </div>
          {cartData?.length > 0 ? (
            cartData?.map((cartItem: any, index: number) => (
              <div className="flex flex-col gap-4" key={index}>
                <div className="flex justify-between py-4 border-b-2 border-dashed border-light-gray">
                  <div className="flex gap-4">
                    <Image
                      className="rounded-lg"
                      src={"https://picsum.photos/200/200"}
                      height={70}
                      width={80}
                      alt=""
                    />
                    <div className="flex flex-col justify-between">
                      <span className="text-xl font-medium">
                        {cartItem.name}
                      </span>
                      <span className="text-base text-mid-gray">
                        Qty: {cartItem.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <span>${cartItem.price}</span>
                    <button onClick={() => handleCartDelete(cartItem._id)}>
                      <TrashIcon className="w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-96 flex justify-center items-center">
              <EmptyState message={"No items are added in the cart"} />
            </div>
          )}
        </div>
        <div className="flex justify-between my-4">
          <p className="text-mid-gray text-3xl">Subtotal</p>
          <p className="text-dark-gray font-semibold text-3xl">${subTotal}</p>
        </div>
      </section>
    </CartDrawer>
  );
}
