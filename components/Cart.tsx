import Image from "next/image";

import axios from "axios";
import { toast } from "react-hot-toast";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";

import CartDrawer from "./CartDrawer";
import EmptyState from "./EmptyState";

type Props = {
  cartOpen: boolean;
  setCartOpen: any;
  cartData: any;
  cartFetch: any;
};

export default function Cart({
  cartOpen,
  setCartOpen,
  cartData,
  cartFetch,
}: Props) {
  const handleCartDelete = (uid: string) => {
    const confirmed = window.confirm(
      "Are you you want to delete this from Cart ?"
    );

    if (confirmed) {
      axios
        .delete(`/cart/delete/${uid}`, {
          baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        })
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
  const allCartItems: any = [];
  cartData.data?.map((cartItem: any) =>
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
          {cartData.data?.length > 0 ? (
            cartData.data?.map((cartItem: any, index: number) => (
              <div className="flex flex-col gap-4" key={index}>
                <div className="flex justify-between py-4 border-b-2 border-dashed border-light-gray">
                  <div className="flex gap-4">
                    <Image
                      className="rounded-lg"
                      src={
                        "data:image/jpeg;base64,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"
                      }
                      height={80}
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
