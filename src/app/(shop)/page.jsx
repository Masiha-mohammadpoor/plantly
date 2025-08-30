import Link from "next/link";
import { getAllProducts } from "@/services/productService";
import ProductSlider from "@/components/ProductSlider";

const getProducts = async () => {
  try {
    const { data } = await getAllProducts("limit=6");
    return data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};

const Home = async () => {
  const response = await getProducts();

  return (
    <section className="flex flex-col">
      <article className="grid grid-cols-6 mt-[70px] px-8">
        <div className="col-span-2"></div>
        <div className="col-span-2">
          <p className="text-primary-200 font-semibold text-lg pl-1">
            Go green.
          </p>
          <h1 className="font-bold text-7xl leading-25">
            The world <br /> of plants.
          </h1>
        </div>
        <div className="col-span-2 pt-10 flex flex-col gap-y-5">
          <p className="text-secondary-500 pr-3 leading-8">
            Discover everything you need to know about your plants, treat them
            with kindness and they will take care of you.
          </p>
          <div className="relative bg-red-300 mt-1">
            <Link href="/products">
              <button className="absolute shop-btn w-32 p-2 rounded-l-lg text-white bg-primary-500 cursor-pointer hover:bg-primary-800 transition-all duration-300">
                Go to shop
              </button>
            </Link>
            <Link href="/profile">
              <button className="absolute profile-btn w-32 p-2 rounded-r-lg text-white bg-secondary-500 left-28 cursor-pointer hover:bg-secondary-800 transition-all duration-300">
                My profile
              </button>
            </Link>
          </div>
        </div>
      </article>
      <article className="absolute bottom-0 left-0 right-0">
        <ProductSlider products={response} />
      </article>
    </section>
  );
};

export default Home;
