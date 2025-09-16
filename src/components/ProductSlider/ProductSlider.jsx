"use client";
import Image from "next/image";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import styles from "./ProductSlider.module.css";

const ProductSlider = ({ products }) => {
  const productsNumber = [1, 2, 3, 4, 5, 6];
  const [currentSlide, setCurrentSlide] = useState(0);

  const swiperParams = {
    modules: [Autoplay],
    loop: true,
    spaceBetween: 0,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    allowTouchMove: false,
    speed: 500,
    onSlideChange: (swiper) => {
      setCurrentSlide(swiper.realIndex % productsNumber.length);
    },
    breakpoints: {
      1240: {
        slidesPerView: 5,
      },
      1024: {
        slidesPerView: 4,
      },
      880: {
        slidesPerView: 3,
      },
      750: {
        slidesPerView: 3,
      },
      410: {
        slidesPerView: 2,
      },
    },
  };
  return (
    <Swiper
      {...swiperParams}
      className={`mt-4 grid grid-cols-5 ${styles.swiperContainer}`}
    >
      {products.map((p, index) => {
        const isActive = currentSlide === index;
        return (
          <SwiperSlide className=" col-span-1 pl-2">
            <div key={p._id} className="relative w-[95%] h-44">
              <div
                className={`w-full h-full bg-white rounded-lg custom-shadow origin-bottom transition-all duration-500 ${
                  isActive && "lg:animate-plant"
                }`}
              ></div>
              <div
                className={`absolute bottom-0 transition-all duration-500 -left-[2.6rem] w-[230px] h-[230px] ${
                  isActive
                    ? "xl:-left-[6.5rem] xl:w-[450px] xl:h-[450px]"
                    : "-left-[2.6rem] w-[230px] h-[230px]"
                }`}
              >
                <Image
                  src={p.images}
                  alt={p.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p
                className={`absolute z-30 transition-all duration-500 ${
                  isActive
                    ? "bottom-16 right-[15%] lg:right-[25%] text-black"
                    : "bottom-5 right-5 text-secondary-500"
                } text-sm font-semibold`}
              >
                {p.name}
              </p>
              {isActive && (
                <Link href={`/products/${p._id}`}>
                  <p className="transition-all duration-500 absolute bottom-10 right-[13%] lg:right-[25%] text-primary-500 flex items-center text-xs">
                    View the product <HiArrowNarrowRight />
                  </p>
                </Link>
              )}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ProductSlider;
