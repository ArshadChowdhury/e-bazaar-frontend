import React from "react";
import Image from "next/image";

const EmptyState = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={"/assets/no-product.png"}
        height={300}
        width={300}
        alt="no-product-found"
      />
      <p>Sorry we found no product with that name</p>
    </div>
  );
};

export default EmptyState;
