import Image from "next/image";

const NoProduct = () => {
  return (
    <section className="col-span-12 w-full flex flex-col justify-center items-center">
      <div className="w-[220px] h-[220px] relative">
        <Image
          src="/UI-images/empty-products.svg"
          alt="empty cart"
          fill
          className="object-contain"
        />
      </div>
      <h2 className="text-primary-500 font-semibold">There is no product</h2>
    </section>
  );
};

export default NoProduct;
