import Image from "next/image";
import axios from "axios";

const handleAddToCart = (product) => {
  const payload = {
    name: product.name,
    price: product.price,
    quantity: 1,
  };

  axios
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
};

export default function ProductCard({ product }) {
  return (
    <>
      <div className="border border-light-gray p-4">
        <div className="flex justify-center">
          <Image
            src={"https://picsum.photos/200/200"}
            height={200}
            width={200}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold">{product.name}</span>
          <span className="text-lg font-semibold">{product.price}</span>
          {!(<span className="text-mid-gray text-sm">{product.price}</span>)}
          <div className="flex">
            {
              !(
                <>
                  <button>-</button>
                  <button>2</button>
                  <button>+</button>
                </>
              )
            }
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
