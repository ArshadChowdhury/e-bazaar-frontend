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

  // Fetching data from backend and adding search params, pagination as required by user
  const fetch = async () => {
    // Sanitizing the params making sure only if there is a param we'll send a request with param
    const sanitizedParams = {
      ...(searchParam.length > 0 && { search: searchParam }),
      ...(page > 1 && { page: page }),
    };
    const { data } = await APIKit.products.getAllProducts(sanitizedParams);
    return data;
  };

  // Tanstack query data fetching and caching with query key for products
  const {
    isLoading,
    isError,
    data: productData,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["/all-products"],
    queryFn: fetch,
  });

  // Tanstack query data fetching and caching with query key for cart
  const { data: cartData, refetch: cartRefetch } = useQuery({
    queryKey: ["/all-cart"],
    queryFn: () => APIKit.cart.getAllCartProducts().then(({ data }) => data),
  });

  // Refetching the products when there's a change in search params or pagination
  useEffect(() => {
    refetchProducts();
  }, [searchParam, page]);

  // Loading and Error state handling for tanstack query data fetching
  if (isLoading) return <p className="text-center">Loading...</p>;

  if (isError) return <p className="text-center">Error...</p>;

  return (
    // Trying to follow the semantic way to structure html for better seo ranking and readability
    <>
      <header className="md:border-b border-light-gray lg:mx-0">
        <nav className="flex justify-between mx-4 my-8 max-w-7xl xl:mx-auto">
          <Image
            className="object-contain w-32 h-8 cursor-pointer md:w-44 md:h-10"
            src="/logo/logo-original.png"
            height={40}
            width={170}
            alt="e-bazaar-logo"
          />
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-3 px-3 py-1 text-sm font-medium border rounded-md border-light-gray md:px-6 md:py-2 md:text-base"
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

      <main className="flex flex-col mx-4 max-w-7xl xl:mx-auto">
        <section className="flex flex-col gap-8 my-6 lg:flex-row">
          {/* Made a different inforcard component which will take some props and add them inside the cards */}
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

        <section className="relative flex flex-col-reverse gap-6 lg:flex-row">
          <input
            onChange={(event) => {
              setSearchParam(event.target.value);
              setPage(1);
            }}
            className="w-full p-3 text-sm border rounded-md outline-none lg:w-11/12 bg-light-white border-light-gray"
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
            className="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium border rounded-md lg:w-1/6 border-darker-sky text-darker-sky"
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
          {/* Handling empty state just in case there are no products with the search term */}
          {productData?.results.length <= 0 && (
            <EmptyState message={"Sorry we found no product with that name"} />
          )}
        </section>

        <aside className="flex justify-center py-6 sm:justify-end">
          {/* We wanna show the pagination only if there's prodct, if there's no product at all we don't need pagination */}
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
