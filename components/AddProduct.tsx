import { useState } from "react";

import axios from "axios";
import slugify from "slugify";
import { toast } from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";

import AddProductModal from "./AddProductModal";

export default function AddProduct({ open, setOpen, productFetch }: any) {
  const [productName, setProductName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [slug, setSlug] = useState("");

  const input = {
    style: "border border-gray-300 px-4 py-2 rounded-lg outline-none",
  };

  const label = {
    style: "text-dark-gray font-medium",
  };

  const handleAddProduct = (payload: any) => {
    if (payload.name == "") return alert("Product name is required");
    if (payload.slug == "") return alert("Product slug is required");
    if (payload.price == "") return alert("Product price is required");
    if (payload.price != parseInt(payload.price))
      return alert("Product price should be in whole number");

    axios
      .post(`/products/create-product`, payload)
      .then(function (response) {
        if (response.status == 201) {
          productFetch();
          setOpen(false);
          setStartDate("");
          setEndDate("");
          setPrice("");
          setSlug("");
          setProductName("");
          return toast.success("Product added to collection");
        }
        return toast.error("Product adding failed");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const payload = {
    name: productName,
    price: price,
    slug: slug,
    discount_startDate: startDate,
    discount_endDate: endDate,
  };

  return (
    <AddProductModal open={open} setOpen={setOpen}>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="text-dark-gray font-semibold text-xl md:text-[40px]">
            Add New Product
          </h1>
          <XMarkIcon
            onClick={() => {
              setOpen(false);
              setSlug("");
            }}
            className="w-6 md:w-10 cursor-pointer"
          />
        </div>
        <h4 className="text-gray-500 text-sm md:text-xl mb-4">
          Add description of your new product
        </h4>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className={label.style} htmlFor="">
              Product Name
            </label>
            <input
              className={input.style}
              type="text"
              placeholder="Product name"
              onChange={(event) => setProductName(event.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col w-full md:w-1/2 gap-1 relative">
              <label className={label.style} htmlFor="">
                Slug
              </label>
              <button
                onClick={() =>
                  setSlug(
                    slugify(productName, {
                      lower: true,
                      trim: true,
                      remove: undefined,
                    })
                  )
                }
                className="absolute right-2 top-8 px-4 py-1 bg-dark-sky rounded-lg text-light-white"
              >
                Generate
              </button>
              <input
                value={slug}
                className={input.style}
                type="text"
                placeholder="product-name"
                onChange={(event) => setSlug(event.target.value)}
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-1">
              <label className={label.style} htmlFor="">
                Price
              </label>
              <input
                className={input.style}
                type="text"
                placeholder="80"
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col w-full md:w-1/2 gap-1">
              <label className={label.style} htmlFor="">
                Discount Start
              </label>
              <input
                className={input.style}
                type="date"
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-1">
              <label className={label.style} htmlFor="">
                Discount End
              </label>
              <input
                className={input.style}
                type="date"
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => handleAddProduct(payload)}
          className="text-white font-medium bg-dark-sky shadow-sm py-2 px-4 rounded-lg"
        >
          Add
        </button>
      </div>
    </AddProductModal>
  );
}
