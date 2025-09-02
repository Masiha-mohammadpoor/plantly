import Image from "next/image";
import { FaRegBookmark } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";

const productPage = () => {
  return (
    <section className="px-20 flex justify-center items-start gap-x-16 mt-16 pb-10">
      {/* image */}
      <article>
        <div className="relative w-[290px] h-[380px] rounded-t-[300px] rounded-b-lg bg-primary-200 custom-shadow">
          <div className="w-[400px] h-[400px] absolute -top-4 -left-15">
            <Image
              src="/images/peace-lily.webp"
              alt="plant"
              fill
              className="object-contain product-image"
            />
          </div>
        </div>
      </article>
      {/* detail */}
      <article className="mt-5 flex flex-col items-start gap-y-4">
        <div>
          <div className="flex gap-x-2">
            <button className="text-red-500 text-2xl cursor-pointer">
              <HiOutlineHeart />
            </button>
            <button className="text-primary-500 text-xl cursor-pointer">
              <FaRegBookmark />
            </button>
          </div>
        </div>
        <p className="text-6xl font-extralight text-secondary-800">
          Peace lily
        </p>
        <p className="w-[22rem] text-sm text-secondary-500 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil labore
          non earum et eveniet! Commodi doloremque sit itaque id vero.
        </p>
        <div className="py-1 px-3 rounded-full bg-primary-200 text-sm text-white ">
          Category
        </div>
        <div className="py-2 flex flex-col">
          <div className="flex items-center gap-x-2">
            <span className="text-white text-xs bg-red-500 px-2 py-0.5 rounded-full">
              10 %
            </span>
            <p className="text-sm line-through">$ 100.00</p>
          </div>
          <p>$ 90.00</p>
        </div>
        <button className="text-white w-80 bg-primary-200 rounded-lg custom-shadow cursor-pointer py-1.5 transition-all duration-300 hover:bg-primary-500">
          Add To Cart
        </button>
      </article>
    </section>
  );
};

export default productPage;
