import Link from "next/link";
import { getAllProducts } from "@/services/productService";
import ProductSlider from "@/components/ProductSlider/ProductSlider";
export const dynamic = "force-dynamic";

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
    <section className="flex flex-col overflow-x-hidden h-screen pb-20 lg:pb-0">
      <article className="grid grid-cols-6 mt-[70px] lg:px-8 px-4">
        <div className="col-span-6 xl:col-span-2 hidden xl:block"></div>
        <div className="col-span-6 xl:col-span-2">
          <p className="text-primary-200 font-semibold text-lg pl-1">
            Go green.
          </p>
          <h1 className="font-bold text-5xl lg:text-7xl leading-15 lg:leading-25 text-center xl:text-start">
            The world <br /> of plants.
          </h1>
        </div>
        <div className="col-span-6 xl:col-span-2 pt-5 xl:pt-10 flex flex-col gap-y-5">
          <p className="text-secondary-500 xl:pr-3 leading-8 text-center xl:text-start">
            Discover everything you need to know about your plants, treat them
            with kindness and they will take care of you.
          </p>
          <div className="mt-1 w-full h-10">
            <div className="flex justify-center xl:justify-start">
              <Link href="/products">
                <button className="shop-btn w-32 p-2 rounded-l-lg text-white bg-primary-500 cursor-pointer hover:bg-primary-800 transition-all duration-300">
                  Go to shop
                </button>
              </Link>
              <Link href="/profile">
                <button className="profile-btn w-32 p-2 rounded-r-lg text-white bg-secondary-500 -ml-4 cursor-pointer hover:bg-secondary-800 transition-all duration-300">
                  My profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </article>
      <article className="xl:absolute xl:bottom-0 xl:left-0 xl:right-0 mt-12 ">
        <ProductSlider products={response} />
      </article>
    </section>
  );
};

export default Home;
