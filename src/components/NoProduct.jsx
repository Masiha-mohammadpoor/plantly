import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

const NoProduct = ({ link = false, text = "There is no product" }) => {
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
      <h2 className="text-primary-500 font-semibold">{text}</h2>
      {link && (
        <Link href="/products">
          <span className="flex items-center gap-x-2 mt-2">
            Go to the products page <FaLongArrowAltRight />
          </span>
        </Link>
      )}
    </section>
  );
};

export default NoProduct;
