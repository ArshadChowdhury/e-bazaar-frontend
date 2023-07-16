"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import axios from "axios";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import AddProduct from "@/components/AddProduct";
import Cart from "@/components/Cart";
import EmptyState from "@/components/EmptyState";
import InfoCard from "@/components/InfoCard";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchParam, setSearchParam] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [response, setResponse] = useState<any>([]);
  const [cartResponse, setCartResponse] = useState<any>([]);

  const productFetch = () => {
    axios
      .get(`https://e-bazaar-backend.up.railway.app/products/all-products`, {
        params: {
          search: searchParam,
          page: page,
        },
      })
      .then((response: object) => setResponse(response))
      .catch((err) => console.warn(err));
  };

  const cartFetch = () => {
    axios
      .get(`https://e-bazaar-backend.up.railway.app/cart/all-cartItems`)
      .then((response: any) => setCartResponse(response))
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    axios
      .get(`https://e-bazaar-backend.up.railway.app/products/all-products`, {
        params: {
          search: searchParam,
          page: page,
        },
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      })
      .then((response: object) => setResponse(response))
      .catch((err) => console.warn(err));
  }, [searchParam, page]);

  useEffect(() => {
    cartFetch();
  }, []);

  return (
    <>
      <header className="md:border-b border-light-gray mx-4 lg:mx-0">
        <nav className="max-w-7xl md:mx-auto mx-4 flex justify-between my-8">
          <Image
            className="md:w-44 md:h-10 w-32 h-8 object-contain"
            src="/logo/logo-original.png"
            height={40}
            width={170}
            alt="e-bazaar-logo"
          />
          <button
            onClick={() => setCartOpen(true)}
            className="relative border border-light-gray px-3 py-1 md:px-6 md:py-2 rounded-md flex items-center gap-3 font-medium text-sm md:text-base"
          >
            {cartResponse.data?.length > 0 && (
              <Image
                className="absolute top-[1px] left-[21px] sm:top-[2px] sm:left-[34px]"
                src="/assets/cart-counter-icon.png"
                height={16}
                width={16}
                alt="e-bazaar-logo"
              />
            )}
            <Image
              src="/assets/cart-icon.png"
              height={22}
              width={22}
              alt="cart-icon"
            />
            Cart{" "}
            {cartResponse.data?.length > 0 && `(${cartResponse.data.length})`}
          </button>
        </nav>
      </header>

      <main className="flex flex-col max-w-7xl lg:mx-auto mx-4">
        <section className="my-6 flex flex-col md:flex-row gap-8">
          <InfoCard
            imageSrc={"/assets/product.png"}
            title={`Total Product : ${
              response.data?.totalProducts > 0
                ? response.data?.totalProducts
                : "0"
            }`}
            description={`Warehouse has total of ${
              response.data?.totalProducts > 0
                ? response.data?.totalProducts
                : "0"
            } product today & the max capacity is 200.`}
          />
          <InfoCard
            imageSrc={"/assets/vendor.png"}
            title={"Total Vendor: 06"}
            description={
              "A total of 6 out of 10 vendor are available for supply now."
            }
          />
          <InfoCard
            imageSrc={"/assets/unique.png"}
            title={`Unique Product : ${
              response.data?.totalProducts > 0
                ? response.data?.totalProducts
                : "0"
            }`}
            description={
              "Total number of products that are not duplicate or redundant."
            }
          />
        </section>

        <section className="flex flex-col-reverse lg:flex-row gap-6 relative">
          <input
            onChange={(event) => setSearchParam(event.target.value)}
            className="w-full lg:w-11/12 bg-light-white border border-light-gray rounded-md text-sm p-3 outline-none"
          />
          <Image
            className="absolute lg:top-4 lg:right-[240px] right-4 top-[90px]"
            height={16}
            width={16}
            src={"/assets/search-icon.png"}
            alt=""
          />
          <button
            onClick={() => setOpen(!open)}
            className="w-full lg:w-1/6 border border-dark-sky rounded-md px-6 py-3 text-dark-sky font-medium flex justify-center items-center gap-2"
          >
            <PlusCircleIcon className="w-6" />
            Add Product
          </button>
        </section>

        <AddProduct open={open} setOpen={setOpen} productFetch={productFetch} />

        <Cart
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          cartData={cartResponse}
          cartFetch={cartFetch}
        />

        <section className="text-2xl font-medium">
          <h3 className="my-4">
            Showing {response.data?.results?.length} of{" "}
            {response.data?.totalProducts} results
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {response.data?.results?.length > 0 &&
              response.data?.results.map((product: [], index: number) => (
                <ProductCard
                  key={index}
                  product={product}
                  cartFetch={cartFetch}
                  cartResponse={cartResponse}
                />
              ))}
          </div>
          {response.data?.results.length <= 0 && (
            <EmptyState message={"Sorry we found no product with that name"} />
          )}
        </section>

        <aside className="py-6 flex sm:justify-end justify-center">
          {response.data?.results.length > 0 && (
            <Pagination
              setPage={setPage}
              page={page}
              dataCount={response.data?.totalProducts}
            />
          )}
        </aside>
      </main>
    </>
  );
}
