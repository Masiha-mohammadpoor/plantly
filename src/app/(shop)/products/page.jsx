import Image from "next/image";
import {
  HiOutlineSearch,
  HiOutlinePlusSm,
  HiOutlineHeart,
} from "react-icons/hi";
import { FaRegBookmark } from "react-icons/fa6";
import Filter from "@/components/Filter";

const Products = () => {
  const productsNumber = [1, 2, 3, 4, 5, 6];

  return (
    <section className="mt-10 flex flex-col">
      <article className="flex flex-col justify-center items-center">
        <div className="flex justify-center w-screen">
          <input
            type="text"
            className="bg-white outline-0 px-5 py-2 w-[50%] rounded-l-full custom-shadow text-secondary-500"
            placeholder="plant name..."
          />
          <button className="cursor-pointer py-2 px-5 rounded-r-full shadow-2xl  bg-white text-2xl text-secondary-500">
            <HiOutlineSearch />
          </button>
        </div>
      </article>
      <article className="mt-10 px-8 grid grid-cols-12 gap-8">
        <Filter />
        <article className="col-span-9">
          <h2 className="pb-6 text-secondary-500 text-lg font-semibold">
            plants (6)
          </h2>
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            {productsNumber.map((p) => {
              return (
                <div
                  key={p}
                  className="rounded-lg col-span-3 bg-primary-200 relative h-52"
                >
                  <div className="absolute left-2 top-2 flex gap-x-1">
                    <button className="text-red-500 text-2xl cursor-pointer">
                      <HiOutlineHeart />
                    </button>
                    <button className="text-primary-500 text-xl cursor-pointer">
                      <FaRegBookmark />
                    </button>
                  </div>
                  <div className="absolute top-10 left-2 rounded-full text-xs text-white bg-primary-500 px-2 py-1">
                    category
                  </div>
                  <div className="absolute w-40 h-40 left-[70px] -top-12">
                    <Image
                      src="/images/plant-1.webp"
                      alt="plant"
                      fill
                      className="object-contain product-image"
                    />
                  </div>
                  <div className="absolute bottom-0 flex justify-between items-end w-full px-2 pb-1">
                    <div>
                      <p className="text-sm text-white">
                        Chlorophytunm <br /> Comosum
                      </p>
                      <p className="text-sm text-white py-2">$ 25</p>
                    </div>
                    <button className="p-1.5 text-white rounded-lg bg-primary-500 mb-1 cursor-pointer">
                      <HiOutlinePlusSm />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </article>
    </section>
  );
};

export default Products;
