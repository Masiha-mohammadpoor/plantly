import Image from "next/image";
import { HiArrowNarrowRight } from "react-icons/hi";

const Home = () => {
  return (
    <secion className="flex flex-col">
      <article className="grid grid-cols-6 mt-[70px] px-8">
        <div className="col-span-2"></div>
        <div className="col-span-2">
          <p className="text-primary-500 text-lg pl-1">Go green.</p>
          <h1 className="font-bold text-6xl leading-20">
            The world <br /> of plants.
          </h1>
        </div>
        <div className="col-span-2 pt-10 flex flex-col gap-y-5">
          <p className="text-secondary-500 pr-3">
            Discover everything you need to know about your plants, treat them
            with kindness and they will take care of you.
          </p>
          <div className="relative bg-red-300">
            <button className="absolute shop-btn w-32 p-2 rounded-l-lg text-white bg-primary-500 cursor-pointer hover:bg-primary-800 transition-all duration-300">
              Go to shop
            </button>
            <button className="absolute profile-btn w-32 p-2 rounded-r-lg text-white bg-secondary-500 left-28 cursor-pointer hover:bg-secondary-800 transition-all duration-300">
              My profile
            </button>
          </div>
        </div>
      </article>
      <article className="absolute bottom-0 left-0 righ-0 w-full mt-4 mb-2 grid grid-cols-5 gap-6 px-6">
        {/*  */}
        <div className="relative col-span-1 h-44">
          <div className="w-full h-full bg-white rounded-lg homePage-plant animate-plant origin-bottom"></div>
          <div className="absolute bottom-0 -left-[7rem] w-[400px] h-[400px]">
            <Image
              src="/images/plant-1.webp"
              alt="plant"
              fill
              className="object-contain"
            />
          </div>
          <p className="absolute z-30 bottom-16 right-[25%] text-sm font-semibold text-black">
            Chlorophytunm <br />
            Comosum
          </p>
          <p className="absolute bottom-10 right-[25%] text-primary-500 flex items-center text-xs">View the product <HiArrowNarrowRight/></p>
        </div>
        {/*  */}
        <div className="relative col-span-1 h-44">
          <div className="w-full h-full bg-white rounded-lg homePage-plant origin-bottom"></div>
          <div  className="absolute bottom-0 -left-[3.5rem] w-[190px] h-[190px]">
            <Image
              src="/images/plant-1.webp"
              alt="plant"
              fill
              className="object-contain"
            />
          </div>
          <p className="absolute z-30 bottom-5 right-5 text-sm font-semibold text-secondary-500">
            Chlorophytunm <br />
            Comosum
          </p>
        </div>
        <div className="relative col-span-1 h-44">
          <div className="w-full h-full bg-white rounded-lg homePage-plant origin-bottom"></div>
          <div  className="absolute bottom-0 -left-[3.5rem] w-[190px] h-[190px]">
            <Image
              src="/images/plant-1.webp"
              alt="plant"
              fill
              className="object-contain"
            />
          </div>
          <p className="absolute z-30 bottom-5 right-5 text-sm font-semibold text-secondary-500">
            Chlorophytunm <br />
            Comosum
          </p>
        </div>
        <div className="relative col-span-1 h-44">
          <div className="w-full h-full bg-white rounded-lg homePage-plant origin-bottom"></div>
          <div  className="absolute bottom-0 -left-[3.5rem] w-[190px] h-[190px]">
            <Image
              src="/images/plant-1.webp"
              alt="plant"
              fill
              className="object-contain"
            />
          </div>
          <p className="absolute z-30 bottom-5 right-5 text-sm font-semibold text-secondary-500">
            Chlorophytunm <br />
            Comosum
          </p>
        </div>
        <div className="relative col-span-1 h-44">
          <div className="w-full h-full bg-white rounded-lg homePage-plant origin-bottom"></div>
          <div  className="absolute bottom-0 -left-[3.5rem] w-[190px] h-[190px]">
            <Image
              src="/images/plant-1.webp"
              alt="plant"
              fill
              className="object-contain"
            />
          </div>
          <p className="absolute z-30 bottom-5 right-5 text-sm font-semibold text-secondary-500">
            Chlorophytunm <br />
            Comosum
          </p>
        </div>
      </article>
    </secion>
  );
};

export default Home;
