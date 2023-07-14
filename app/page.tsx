"use client";

import InfoCard from "@/components/InfoCard";
import Image from "next/image";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import AddProductModal from "@/components/AddProductModal";
import CartDrawer from "@/components/CartDrawer";

// axios
//   .get("https://dummyjson.com/products")
//   .then(function (response) {
//     // handle success
//     console.log(response.data.products[0]);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });

const input = {
  style: "border border-gray-300 px-4 py-2 rounded-lg outline-none",
};

const label = {
  style: "text-dark-gray font-medium",
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className="md:border-b border-light-gray">
        <nav className="max-w-7xl md:mx-auto mx-4 flex justify-between my-8">
          <Image
            src="/logo/logo-original.png"
            height={40}
            width={170}
            alt="e-bazaar-logo"
          />
          <button
            onClick={() => setCartOpen(true)}
            className="relative border border-light-gray px-2 md:px-6 md:py-2 rounded-md flex items-center gap-2 font-medium text-sm md:text-base"
          >
            <Image
              className="absolute top-1 left-[18px] sm:top-[2px] sm:left-[34px]"
              src="/assets/cart-counter-icon.png"
              height={16}
              width={16}
              alt="e-bazaar-logo"
            />
            <Image
              src="/assets/cart-icon.png"
              height={22}
              width={22}
              alt="cart-icon"
            />
            Cart (4)
          </button>
        </nav>
      </header>

      <main className="flex flex-col max-w-7xl md:mx-auto">
        <section className="mx-4 sm:mx-0 my-6 flex flex-col md:flex-row gap-8">
          <InfoCard
            imageSrc={"/assets/product.png"}
            title={"Total Product : 100"}
            description={
              "Warehouse has total of 100 product today & the max capacity is 200."
            }
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
            title={"Unique Product : 40"}
            description={
              "Total number of products that are not duplicate or redundant."
            }
          />
        </section>

        <section className="m-4 sm:mx-0 flex flex-col-reverse md:flex-row gap-6 relative">
          <input className="w-full lg:w-11/12 bg-light-white border border-light-gray rounded-md text-sm p-3 outline-none" />
          <Image
            className="absolute md:top-4 md:right-[240px] right-4 top-[90px]"
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

        <AddProductModal open={open} setOpen={setOpen}>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h1 className="text-dark-gray font-semibold text-xl md:text-[40px]">
                Add New Product
              </h1>
              <XMarkIcon
                onClick={() => setOpen(false)}
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
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col w-full md:w-1/2 gap-1 relative">
                  <label className={label.style} htmlFor="">
                    Slug
                  </label>
                  <button className="absolute right-2 top-8 px-4 py-1 bg-dark-sky rounded-lg text-light-white">
                    Generate
                  </button>
                  <input
                    className={input.style}
                    type="text"
                    placeholder="product-name"
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/2 gap-1">
                  <label className={label.style} htmlFor="">
                    Price
                  </label>
                  <input className={input.style} type="text" placeholder="80" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col w-full md:w-1/2 gap-1">
                  <label className={label.style} htmlFor="">
                    Discount Start
                  </label>
                  <input className={input.style} type="date" />
                </div>
                <div className="flex flex-col w-full md:w-1/2 gap-1">
                  <label className={label.style} htmlFor="">
                    Discount End
                  </label>
                  <input className={input.style} type="date" />
                </div>
              </div>
            </div>
            <button className="text-white font-medium bg-dark-sky shadow-sm py-2 px-4 rounded-lg">
              Add
            </button>
          </div>
        </AddProductModal>

        <CartDrawer open={cartOpen} setOpen={setCartOpen}>
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-[40px]">Shopping Cart</h1>
              <XMarkIcon
                onClick={() => setCartOpen(false)}
                className="w-6 md:w-10 cursor-pointer"
              />
            </div>
          </div>
        </CartDrawer>

        <section className="text-2xl font-medium mx-4 sm:mx-0">
          <h3 className="my-4">Showing 1-8 of 100 results</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4">
            <div className="border border-light-gray p-4">
              <div className="flex justify-center">
                <Image
                  src={
                    "data:image/jpeg;base64,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"
                  }
                  height={200}
                  width={200}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold">
                  DJI Phantom 2 Vision+
                </span>
                <span className="text-lg font-semibold">$499</span>
                {!(<span className="text-mid-gray text-sm">$599</span>)}
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
                  <button className="border border-light-gray rounded-md px-4 py-2 text-sm text-dark-gray">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
            <div className="border border-light-gray p-4">
              <div className="flex justify-center">
                <Image
                  src={
                    "data:image/jpeg;base64,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"
                  }
                  height={200}
                  width={200}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold">
                  DJI Phantom 2 Vision+
                </span>
                <span className="text-lg font-semibold">$499</span>
                {!(<span className="text-mid-gray text-sm">$599</span>)}
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
                  <button className="border border-light-gray rounded-md px-4 py-2 text-sm text-dark-gray">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-light-gray p-4">
              <div className="flex justify-center">
                <Image
                  src={
                    "data:image/jpeg;base64,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"
                  }
                  height={200}
                  width={200}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold">
                  DJI Phantom 2 Vision+
                </span>
                <span className="text-lg font-semibold">$499</span>
                {!(<span className="text-mid-gray text-sm">$599</span>)}
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
                  <button className="border border-light-gray rounded-md px-4 py-2 text-sm text-dark-gray">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
            <div className="border border-light-gray p-4">
              <div className="flex justify-center">
                <Image
                  src={
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKYA6wMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAQIDBAUGB//EADYQAAICAgEDAgMGBQMFAQAAAAECAAMEEQUSITETQQYUUSIyYXGBkSNCUqHRM7HBBxZTYuEV/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EAC4RAAICAQQBAwMDBAMBAAAAAAABAgMRBBIhMUEFE1EiMnEUM2EjJIHBQpGhFf/aAAwDAQACEQMRAD8A80qz3TxC1VkgtAgEgIA4ACCBwAgBAHAHACAOAOAEAIAQAgBACAEAIAQAgCgkDAIkQCLCAVMsAq6ZBJJBBBYBJBMCAOAAgDggIAQBwBwSEEDgDEAIAQAgBACAEAIAQAgBACAEEigCMAREAgwgFepBIKJJBYBAHAHACAOCAgBACAPUAcAYBJ0IZKWS30X19ZXci2xkGUr5Etkq1gjBA4ApIGFJ8AyMk4Y2UqO4hPIcWiMEDgCgDkgJAFBIQAgCMAiRAIagCEAkIA4A9QAggIA4AQA1AHBJJEZ2CqNyG0iUs9G+nFCDuO/vMJWZOmFSXZNk14hMloqZAfaXTKNGWxOg69jNE8owksMEQsfwhtIKOTRXQombkaqtF6VSjkaqI7MfqQ9u8hTwxKGUc2xSjEH2nSnlHI1higgIASQEgBBIoAQAgCIgEdQCIEEDgkIA4IHAJ1p1N0w3gtGO54LRjOfEp7iLqpj+Us3rUj3UT7MiaYDse51+kq74ostPJmvF4gWXV+vkJXSXCs3uB+H4zKWsglhdmkdHNvL6Ozy/EYXCZCgWP6Vi7Qtok/qJjG6y3hI39uupZbObZlYf8r95pGE/go7IfJS2RRrs00UJGbnEqa6r+qX2sq5RMtrqzDXgTSKaRjJpstSyoADco0zROKL0tq/rEo4supx+TRU9JOvUWZyUjWLizdTSl2kSyvZOu7TmnJw5Z0RipcIxc/xGRg3qjp1EjqD1glSPznXRapLk4r6mnwcg1Ov3lI/SdO5HNtZAgj2klRQAgkcAWoAagBADUDAoGCEECgkcAYEED1AJ1N0WKfaRJZRaDwzoVsD3E55I64y4NKECYyRtGRorZfec065Po3hJFgGG9qNmUPkJUQ6qrdOiPcmYtOvlmuVPhHV5fNwObx1x7sZ6rKx/CsV96/P6iWpvcJ5RnbQrI4PHZmDkYNoryqirFeoH2I8bB+k9mFsZdM8mdM4fcjPr31NOTJYY+nRgkO8gBr8IIDX4QArRrG6a1Lk9gFGyf2kcYJOlx/EWtmUvl3NhV1uHbqQ9Ta9te04dXdBx2o7tLTNSyz2nN3YPJVJZTnAWVJ2rsGuvXf8AfsZwxnxhHc4+WeWurQ+Z1QcjCcYmR66/oJ0KUjBxiUWCpQdgTWOWZSUUjGTvuOwmy6OdiggcAUAIJwEANQCqCoQBwSPUEDgAIBZXYyeO4lXFMvGbRoTKH8wImbrbNo2ot+bTR035SirZf3lgo+avFnXW2po6oSjtksmXvTTzFmvF5AlujKH2Tv7Xnz7flODUaHjNXfwejo9dDfjUxzH5+DoaD8px+fZc7VYQcGsDYdHBUj8u/ecKzlLpo73ZGtSjDmMjofB/BYGZwwp5hE+ardlS2qz7Rr39nf17fUTpr1FsO3k5tZTp7LN0FjPwdC//AKfUOd43IuB7CxAf7idMda/KOB6NeGVr/wBOyP8AU5JQP/Wv/wCyf138Efo38lqfA/GUDeVm3vr6aT/MpLXS8I0Wij5Z5T4+xMfBs4qn4exXsR7j824bqJUdOgSToA/a/ac1mqufTwd+l02mSlvjl44yUgZafGN3M4ltVOE1JqqrUd1BAB0Pbx5mE5vOZPJvFp0+3FJF+TmIH0zvYxIP2XPYj33NqdLZb9TWEY6m2ijEIS3S/wDF/kr+ZAUhB0k+T42frodt/jOqvSKLzk4Z6ncsIpfIX+udSrOeVpRZkb+7/eaRh8mMrfgoZix2x3NEsGTbYoAQAgBBKCAEAIBTBUcAeoA4ACAOAMQSEkBrZGpGQbsbHLL4mFk0mdNcG0Xri/h/aU9w09s3YWFlWA10I7Aa7A6Cnc5tRGM1u8nRRKUePB3OTw8XjR6FOQ3zdaqzJ4Gj7icm5dI3SZ6bAvZ8SooOrsO0A122ArsI/wC0A818Ss2q9Me7a1uAjzz4vzVdmkLmtOv7PsPr/eTFRk8MTcorODz+RkW2HTN2HsO09anTV18pcnlW6iybw2Z5uc/8BACAEEhACAGoAQAglBACAEAqgqEAcAcAP0gD0fYGMk4ZIIx/lP7SMr5Jwya49zfdqc/kpkOSXkKEn4Ovw3w7k8g1hY+h0L1AOhJf8tTnv1UYLC5OmnTyk/q4OlgYNKDVjhnJ10p9ZwTtlJ5R6Ea4xOr8hi4qetn2ClPav+dv8SvusnZks4bOrzeXqx8an0sSsGwg+X14/uQZm5NvktjCOFy+ecjl7bFQu1jdlXzoHQEz8lvB2n5/G4f08PIYU39HWqXsqll+o0SD+W9zRFWWD4rqYHrsQD6MQuv1kkFX/wCvgcvYz4gOXj47dN711krs+wP4CEyWW1YC8Zl1ZmIRZQw6SPZkPkfnEsJ5QWXwzzPxRwNvHX+vUnViXN/DZe+vfRnq6e9TWGeVfS4vJwvTf+gn9J0bl8nO4v4D03/ob9oyhh/Auhv6TGUNrEQQdESew+AgBAAQEPUEigBACAEgFMkqOAEAcAmh0ZDLR7NCtM2jVMtWwr3Eq0aJlwyn197pA7zNwTLqbR3fh3IwOPd+Qvtyrr7EA6BoVoB9D/zPPtmlJo7q4txTI38zXQ1jYWMuM9x6mdj1v/gTJ2trBdVpHEyMs23my3LY6YHpK7LfUb7y8KLbOl/3wUnfXDtnf+DLGblzsjRpcgftI27Xglyysni+R5X5Sy12qssZwFHRvez9D7e0q4OD2vwWUk0acbncWuwX8hxmPm9SLpcsdZqOvYyIsiRvyviHgLjW2d8OcQxb7vqjWx+ZlssjGS7glbN5A0YK08dj2n7NFQ+wDrwDITy+SWsI6eByr4j34uUa7sRiR0Ana+3mWbx9xCXwegybas7iKqqstKGOmq9U/eA8jctFpMh5Z4+++xWZWI3vRndCJyyZiss7mbJGDZQ79pdIzbM7HqM1SwZN5FBACAOCUEAR8wAgBIAQCmSVHACAOAEAkCR4kNZJTwTDn3kbS6mMuSO0KKIc2TqyrkQKCNDwSO4/CY2aWqyWWjavVWwWEyNltlp25H5DwJpXTCriCMrLp2v6mTwMY5WZRjr2Ntir/eWnLbHLKwjukkev4Raafji7Gxl1VXU6KN78Ab/2nmOOKNz8s9Ldm9RXhHj8jExslfSyLmrKMQQF+9oyb9NbKe6CzkU6itQ2yeMGbkMHqwsn5NhkdNRb/TZm/DWpyumyL+r/AEdCtg1x/sq5Pjl4nh8HP+IcmhOpVNVXQWdWI3r/ADGH0xldofG8guTVVyHEZYsOPerL9npKMO/SR+I2P3nRXXvplFdmE7Ntqb6Z3+Z1RyQy6ADRloMmsHx0t7fodj9J01xjqKUpeDmslLT3No6OXe//AGph5FfYrkPWQfbYP+JjXpo+7sfg3s1Mvb3ryee9dtd97nobF4OH3H5INYzSVFFXNsgZYqIQCUAIACCUEAJDAQBagDgFEkqEABAJCAEAcABAHACCRwQdP4aHVzvH7/8AOsx1H7UvwbUfux/JvTOXjvjC/LcDpS1wdnXntOa7jTI6audS/wDJwslhZlXuo0GsYqPwJOp2x+1fg4pdv8mbB+JOW4jL/g5tlWHUj76u6qCdzxrtysaPYpw60Y/iZ3+Jq6W5HIfb112rbrfSdHakfkdfpM847L4NHBcFicPw91lWWLr7sgdie4UA62Pqdzu0a+ps4tZ9qPR8knX8N8Rf71vdS35dXUo/bc00y22SgU1P1QjMS5VZ+E3wnB9T5kWL29pKf9y8fBVr+2Wfk487DkCCQgBAHACAhQSEAJDAQAgBAKJJUcAIA4A4AxACAEAcEhBB0OAsWrmsF2OlW5STMdR+1L8G1H7kfyHxJi4vI/NPlIx9bJ60CtrsDOOH9WyMH0kdk37UJT8tmHc9HB5zM9+FjZDdVtKFx2D60w/XzMp0VzzlcmsL7IJJMnj41OOpWpAuzvxr/aTVRCtYRFl0rHmRbr6/vNTM7+NW2V8HuoHenkQQfoGQCcMpqq+UvlHbGHu0xj8M89kYiV8rbkJdawNYr9Mt9hdeSBJ0lTx7ku2V1dnPtx6RKdpxhACCRwAgBACCUEAJDAoAQAgFMnJUcgBJyBxkkcEBAHACAGoAagEkb02D7+73lLVmDRpW8STGvI18ni1X1rYi7ZQLF0ex86/Scmig0pN+Tq1slLal4FO44QgBACAaq+er43C+Qt6h83kKU6VJ2Qp7f8/pPN1dTnbFI9HSWKFUmzMSSdk7J7z0ksLCPPby8sUEBAHBIQAgBACAEEhIYFACAEApgqOAOAOAEEjEnJA9QA1ACAEAIwA8eIA4AQAgBAEQCQSAdeNiME5Y4ICAOAEEhBAQSEAIAQAME5FIGQgDgFAMFRwBwBiCRiCBiAEAJICAEAIA4AQBwAgBACAKAOAEAIAQAgkIAQAgAYApACCQ3BGTh4vN1W661Kzyo+px/wCSOt6R+Gdat0sUMh2DPRqthbHdFnLKLjwyU0KkoJAQQOAEAIASQEAIA4AQBwAgBACAEAIAQAgBACAEAIJCABkMCgBAyR3API4OK+RZah0rqu9+xnxblHCPdwsnc47KX5dKyB1D6Gel6dq3WvbwcmpoUvqOgvc/j51Pf3x8s87a/A9qfDDY9pKlF9MOLXZISxUcAIAQBQAkgIA4A5ACAOSBQAgBGQH6bMAhl+tTivbVWXZe+pwavWxoXHZ0U0OfZz8bmarekWIyMTozmj6qpSUcGstJtTeTpAggEeDPYTzycbWGOCCu6+ukE2MF/OZTuhD7mXjXKXSKq8/Gss9JbR1ykdVU+EyzpmjSDsdpumZ8gYAoAjAI7gHJKY94Zupsexl6lYnsZ8FtcFzye9hM4QtsxMnbKT0t7eDOyuWMSiVcdx6DkOSxuiu3GyPTu6R9he8rO22b8hQiiriei671GyOmwn7Sk63Fdtlck0yk4RksMuyuUKZAppTq+1rZnqw9Usm0kjlelik2arc5KclKWH3vffid69QrdigYfppbdxHI5TGosVGbZb6S9+uqp4fJWGnnIux8ujIUsj9x5Ez0+vru74LWaaUDFfzWNTd6fdh/UIs9RrhLauSY6WTWToY9q5FXqV91I3OuF0JxTTMJVyi8YLAJrkoQW1DYa9/bHkGYQ1Ncp7E+TSVM0tzJO6IQHOtzSVkYvDKKLfKGrq/3SD+UspxDTRKSQEAIASsk30Wi15JIdMDKtPa0X+ndkLeYwMZnW/Keo67p0bBny+s0tis5PYo2OGUefqzuNS9rFHqdXcA+xkUtULd5InHdx4LbOaK76K11vQM64+rXeUcz0kGdOv1a6Bk5NtfpOO2vYy1Xq8nn3IiWij4Zzc62jkuPs6AFurP18zz7bnObfg3jFQRxeNpGRnJU4KNv7TfQSjltWUyywz2uTTj4rVVY9hdSvfvue76dq3Z9DOLU0pLciuescAjBJEmAQ3APn2XmcgjLiL1OoGhseJ8pCFclvZ7jbHTl2ZNdWNYG6lb+I0tsjF58F6pc/UXYt6Y4sSwByG0pPkTOyGWbSjXhvJ6PiKKrK0yDrqHhiNRUnFM5ZR3dGTlzaMz5mrpAU619ZeuuUFvbRKlF8Mhbi3ZGQMnNY1K2uk/USln08ryV46LOQ4qup0K5H2Nb3ORXZbJMFhtxrmrxWL7Ht5m9UXb0ireOyvFqYWFMhSHJ7g+00upnCWCY4lyj0GExxcpaVaxqmG9L4laqtS5LamJuCXLPRYXoFmssJHSNhfqZ9DbK9wSjHs8+Ead+W+jM71NyAynxu5XWh9Z5c/TtRBqUHydP6mqawzNl45ucPax6d70PadVOm1DkpXPoxc60momHgcDMXlLKjZtXbah/pOWWq9jUcdHR7SnUegycWyi0oe5HuJ69Gsqui5RPOsolB4MVuVRWxSyxQ0s9XSk8yIVM34OYnL2nJalqQF8qd+RPNl6ttb44OpaNY7M9vM5C5XQAvSJl/wDVs+7HBd6SKNtHK+rieqlZL71Ot+pwjXl9mP6V7v4OZymaXosqKqLT+4nn3a2Vq/g7K6lWcvhhXStiXI1jN/N/TOe2Lmso6MJLs6VdXzg9ClNlfec0Yy3DBoqupxcVsTPyNkN2Xc1nWmsxJz4Ody2VXg349uNSTUe5B94pg7E0VkXUcrXtr0xvTDDx5mi0WY8yK7scHo8C3Ey6kFSNVYf5395WvVWad7YESrjZ2XZ1q4wPQQ5UeB9Z6NHquIv3Tmt0qythXTabKlcqVJHievp743QTRw21uDwNjNzMrJgGfmOIoxs306mZlXx1DvPC0mjjbUpHrX3e3ZtwQ+FeMwMnNyaFrZciturrPdTOHXy9ie1G9UlOOWX5XwytGfkeq1ditp/u6InNZfKfRriKRRytNONw6NV1hvU6SN9tTOjVT+3wVcVwzzvIXo1IsAfqrI7E9jNa092PkWYzwb87kV5DhKlarVqnStvxNIQxwzMws99ipT6miCATMlCKbZLR0a8KzGyMe3DZAzrpy/fvO3R0u98PBjdNRRnr9fJ5HI+ZZGC9uwnqRqUm4z5MZW4inE9DiVKKa1HlR2M6qIbInHbNt8mudJiEAcDODA+ZY+alh7ekD2E8KulRsscuT1Zz/pxwT5nNvfh0zK3KknpP1nFPURxthHBaFb7bPO8diWctyVVDWheruSRucjaijdRy8HR5rjbeNyXrexLAq7BA0RIxuRZxxwcbjnruyNWoST77mlkHFJ+CvB1bN1vXUh0nnQmDW6QYuV49KF+ZscuzCK5N5j8BLJXQ3yq1N2NbDRGu5nS7JOG0jbybMHKqUtXVX0s3vNtJVGyzZLopbNwXB57P46w59lt13UPI15nXbp/a4RSFm5cm3Pvq5LEw0NZT5YaJH80y0dOG5M1ts4WDg8hmMmSKqSVrBA1LySbeCqbwew4rIFdlCZC9dQTYA87nlW0PG5M2WGa0sSkl0UkO38x3NbNN/TUiu7nBUMlmzww2EPbUpo7ZwllMpOtSXJtsP0n1unsdlakzyLY7ZYKtzYof/9k="
                  }
                  height={200}
                  width={200}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold">
                  DJI Phantom 2 Vision+
                </span>
                <span className="text-lg font-semibold">$499</span>
                {!(<span className="text-mid-gray text-sm">$599</span>)}
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
                  <button className="border border-light-gray rounded-md px-4 py-2 text-sm text-dark-gray">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
