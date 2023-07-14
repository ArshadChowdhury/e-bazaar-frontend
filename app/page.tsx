import InfoCard from "@/components/InfoCard";
import Image from "next/image";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <main>
      <header className="md:border-b border-light-gray">
        <nav className="max-w-7xl md:mx-auto mx-4 flex justify-between my-8">
          <Image
            src="/logo/logo-original.png"
            height={40}
            width={170}
            alt="e-bazaar-logo"
          />
          <button className="relative border border-light-gray px-2 md:px-6 md:py-2 rounded-md flex items-center gap-2 font-medium text-sm md:text-base">
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

      <section className="max-w-7xl md:mx-auto mx-4 my-8 flex flex-col md:flex-row gap-2">
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

      <aside className="max-w-7xl md:mx-auto my-4 flex gap-6 relative">
        <input className="w-4/5 p-2 bg-light-gray border border-light-white focus:ring-offset-0 text-sm" />
        <Image
          className="absolute top-5 right-[290px]"
          height={20}
          width={20}
          src={"/assets/search-icon.png"}
          alt=""
        />
        <button className="w-1/5 border border-dark-sky rounded-md p-4 text-dark-sky font-medium flex justify-center items-center gap-2">
          <PlusCircleIcon className="w-6" />
          Add Product
        </button>
      </aside>

      <section className="max-w-7xl md:mx-auto text-2xl font-medium">
        <h3 className="my-4">Showing 1-8 of 100 results</h3>
        <div className="grid grid-cols-3">
          <div className="border border-light-gray flex flex-col">
            <Image
              src={"/logo/logo-original.png"}
              height={200}
              width={200}
              alt=""
            />
            <div>
              <h3>DJI Phantom 2 Vision+</h3>
              <h4>$499</h4>
              <button>-</button>
              <button>2</button>
              <button>+</button>
            </div>
          </div>
          <div className="border border-light-gray flex flex-col">
            <Image
              src={"/logo/logo-original.png"}
              height={200}
              width={200}
              alt=""
            />
            <div>
              <h3>DJI Phantom 2 Vision+</h3>
              <h4>$499</h4>
              <button>-</button>
              <button>2</button>
              <button>+</button>
            </div>
          </div>

          <div className="border border-light-gray flex flex-col">
            <Image
              src={"/logo/logo-original.png"}
              height={200}
              width={200}
              alt=""
            />
            <div>
              <h3>DJI Phantom 2 Vision+</h3>
              <h4>$499</h4>
              <button>-</button>
              <button>2</button>
              <button>+</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
