import React from "react";
import Image from "next/image";

type Props = {
  imageSrc: string;
  title: string;
  description: string;
};

const InfoCard = ({ imageSrc, title, description }: Props) => {
  return (
    <div className="bg-gradient-to-r from-dark-sky to-mixed-sky rounded-lg relative md:basis-[420px]">
      <div className="before:bg-card-background before:opacity-[.03] before:absolute before:bg-cover before:inset-0">
        <div className="md:mx-5 md:my-[18px] m-4 py-4">
          <div className="bg-white inline-block p-2 rounded-lg">
            <Image src={imageSrc} height={32} width={32} alt="" />
          </div>
          <p className="text-white font-medium text-base md:text-xl my-1">
            {title}
          </p>
          <p className="text-white text-xs font-normal md:text-base w-full md:w-10/12">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
