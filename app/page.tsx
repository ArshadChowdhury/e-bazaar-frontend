import Image from "next/image";

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
          <button className="relative border border-light-gray px-6 py-2 rounded-md flex items-center gap-2 font-medium text-base">
            <Image
              className="absolute top-[2px] left-[34px]"
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
    </main>
  );
}
