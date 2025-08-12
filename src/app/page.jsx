"use client";
import Image from "next/image";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {
  let sliderRef = useRef(null);
  const productsNumber = [1, 2, 3, 4, 5, 6];
  const [animation, setAnimation] = useState(1);

  useEffect(() => {
    sliderRef.slickPlay();

    setInterval(() => {
      setAnimation((prev) => (prev < 6 ? prev + 1 : 1));
    }, 3500);
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3450,
    pauseOnHover: false,
    centerPadding: "20px",
  };

  return (
    <section className="flex flex-col">
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
      <Slider
        ref={(slider) => (sliderRef = slider)}
        {...settings}
        className="mt-4"
      >
        {productsNumber.map((p) => {
          return (
            <div key={p} className={`relative col-span-1 w-44 h-44`}>
              <div
                className={`w-full h-full bg-white rounded-lg homePage-plant origin-bottom transition-all duration-500 ${
                  animation === p && "animate-plant"
                }`}
              ></div>
              <div
                className={`absolute bottom-0 transition-all duration-500 ${
                  animation === p
                    ? "-left-[7rem] w-[400px] h-[400px]"
                    : "-left-[3.5rem] w-[190px] h-[190px]"
                }`}
              >
                <Image
                  src="/images/plant-1.webp"
                  alt="plant"
                  fill
                  className="object-contain"
                />
              </div>
              <p
                className={`absolute z-30 transition-all duration-500 ${
                  animation === p
                    ? "bottom-16 right-[25%] text-black"
                    : "bottom-5 right-5 text-secondary-500"
                } text-sm font-semibold`}
              >
                Chlorophytunm {p}
                <br />
                Comosum
              </p>
              {animation === p && (
                <p className="transition-all duration-500 absolute bottom-10 right-[25%] text-primary-500 flex items-center text-xs">
                  View the product <HiArrowNarrowRight />
                </p>
              )}
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default Home;
