import Image from "next/image";

type Props = {
  message: string;
};

const EmptyState = ({ message }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={"/assets/no-product.png"}
        height={300}
        width={300}
        alt="no-product-found"
      />
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
