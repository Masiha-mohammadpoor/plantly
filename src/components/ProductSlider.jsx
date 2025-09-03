"use client";
import Image from "next/image";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";

const ProductSlider = ({ products }) => {

  const productsNumber = [1, 2, 3, 4, 5, 6];
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    centerPadding: "20px",
    draggable: false,
    swipe: false,
    touchMove: false,
    beforeChange: (current, next) =>
      setCurrentSlide(next % productsNumber.length),
  };

  return (
    <Slider {...settings} className="mt-4">
      {products.map((p, index) => {
        const isActive = currentSlide === index;
        return (
          <div key={p._id} className="relative col-span-1 w-44 h-44">
            <div
              className={`w-full h-full bg-white rounded-lg custom-shadow origin-bottom transition-all duration-500 ${
                isActive && "animate-plant"
              }`}
            ></div>
            <div
              className={`absolute bottom-0 transition-all duration-500 ${
                isActive
                  ? "-left-[6.5rem] w-[450px] h-[450px]"
                  : "-left-[2.5rem] w-[230px] h-[230px]"
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
                  ? "bottom-16 right-[25%] text-black"
                  : "bottom-5 right-5 text-secondary-500"
              } text-sm font-semibold`}
            >
              {p.name}
            </p>
            {isActive && (
              <Link href={`/products/${p._id}`}>
                <p className="transition-all duration-500 absolute bottom-10 right-[25%] text-primary-500 flex items-center text-xs">
                  View the product <HiArrowNarrowRight />
                </p>
              </Link>
            )}
          </div>
        );
      })}
    </Slider>
  );
};

export default ProductSlider;
