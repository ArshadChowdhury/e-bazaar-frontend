"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";

import APIKit from "../common/APIKit";

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

  const fetch = async () => {
    const sanitizedParams = {
      ...(searchParam.length > 0 && { search: searchParam }),
      ...(page > 1 && { page: page }),
    };
    const { data } = await APIKit.products.getAllProducts(sanitizedParams);
    return data;
  };

  const {
    isLoading,
    isError,
    data: productData,
    refetch,
  } = useQuery({
    queryKey: ["/all-products"],
    queryFn: fetch,
  });

  const { data: cartData, refetch: cartRefetch } = useQuery({
    queryKey: ["/all-cart"],
    queryFn: () => APIKit.cart.getAllCartProducts().then(({ data }) => data),
  });

  useEffect(() => {
    refetch();
  }, [searchParam, page]);

  if (isLoading) return <p className="text-center">Loading...</p>;

  if (isError) return <p className="text-center">Error...</p>;

  return (
    <>
      <header className="md:border-b border-light-gray mx-4 lg:mx-0">
        <nav className="max-w-7xl mx-auto flex justify-between my-8">
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
            {cartData?.length > 0 && (
              <Image
                className="absolute top-[1px] left-[22px] md:top-[3px] md:left-[34px]"
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
            Cart {cartData?.length > 0 && `(${cartData?.length})`}
          </button>
        </nav>
      </header>

      <main className="flex flex-col max-w-7xl xl:mx-auto mx-4">
        <section className="my-6 flex flex-col lg:flex-row gap-8">
          <InfoCard
            imageSrc={"/assets/product.png"}
            title={`Total Product : ${
              productData?.totalProducts > 0 ? productData?.totalProducts : "0"
            }`}
            description={`Warehouse has total of ${
              productData?.totalProducts > 0 ? productData?.totalProducts : "0"
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
              productData?.totalProducts > 0 ? productData?.totalProducts : "0"
            }`}
            description={
              "Total number of products that are not duplicate or redundant."
            }
          />
        </section>

        <section className="flex flex-col-reverse lg:flex-row gap-6 relative">
          <input
            onChange={(event) => {
              setSearchParam(event.target.value);
              setPage(1);
            }}
            className="w-full lg:w-11/12 bg-light-white border border-light-gray rounded-md text-sm p-3 outline-none"
          />
          <Image
            className="absolute lg:top-4 lg:right-[20%] xl:right-[19%] right-4 top-[90px]"
            height={16}
            width={16}
            src={"/assets/search-icon.png"}
            alt=""
          />
          <button
            onClick={() => setOpen(true)}
            className="w-full lg:w-1/6 border border-dark-sky rounded-md px-6 py-3 text-dark-sky font-medium flex justify-center items-center gap-2"
          >
            <PlusCircleIcon className="w-6" />
            <span className="truncate">Add Product</span>
          </button>
        </section>

        <AddProduct open={open} setOpen={setOpen} data={productData} />

        <Cart
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          cartData={cartData}
          cartRefetch={cartRefetch}
        />

        <section className="text-2xl font-medium">
          <h3 className="my-4">
            Showing {productData?.results?.length} of{" "}
            {productData?.totalProducts} results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productData?.results?.length > 0 &&
              productData?.results.map((product: object, index: number) => (
                <ProductCard
                  key={index}
                  product={product}
                  cartReFetch={cartRefetch}
                  cartResponse={cartData}
                />
              ))}
          </div>
          {productData?.results.length <= 0 && (
            <EmptyState message={"Sorry we found no product with that name"} />
          )}
        </section>

        <aside className="py-6 flex sm:justify-end justify-center">
          {productData.results.length > 0 && (
            <Pagination
              setPage={setPage}
              page={page}
              dataCount={productData.totalProducts}
            />
          )}
        </aside>
      </main>
    </>
  );
}
