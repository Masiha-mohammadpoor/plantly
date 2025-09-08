import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

const EmptyCart = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-y-4 mt10 lg:mt-20 ">
      <div className="w-[250px] h-[250px] relative">
        <Image
          src="/UI-images/empty-cart.svg"
          alt="empty cart"
          fill
          className="object-contain"
        />
      </div>
      <h2 className="text-primary-500 font-semibold">
        There is nothing in your cart.
      </h2>
      <Link href="/products" className="flex items-center gap-x-2">
        Go To Shopping <FaLongArrowAltRight />
      </Link>
    </section>
  );
};

export default EmptyCart;
