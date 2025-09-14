"use client";
import Image from "next/image";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { LiaCartPlusSolid } from "react-icons/lia";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

const Product = ({ product, user, actionHandler }) => {
  return (
    <div className="rounded-lg col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 sm:mx-0 mx-16 bg-primary-200 relative h-52">
      <div className="absolute left-2 top-2 flex gap-x-1">
        <button
          onClick={() =>
            actionHandler({
              action: "like",
              productId: product._id,
            })
          }
          className="text-red-500 text-2xl cursor-pointer"
        >
          {user?.user?.likes.some((l) => l._id === product._id) ? (
            <HiHeart />
          ) : (
            <HiOutlineHeart />
          )}
        </button>
        <button
          onClick={() =>
            actionHandler({
              action: "save",
              productId: product._id,
            })
          }
          className="text-primary-500 text-xl cursor-pointer"
        >
          {user?.user?.saved.some((l) => l._id === product._id) ? (
            <FaBookmark />
          ) : (
            <FaRegBookmark />
          )}
        </button>
      </div>
      <div className="absolute top-10 left-2 rounded-full text-xs text-white bg-primary-500 px-2 py-1">
        {product.category?.name}
      </div>
      <div className="absolute w-44 h-44 -right-[40px] -top-12">
        <Image
          src={product.images}
          alt={product.name}
          fill
          className="object-contain product-image"
        />
      </div>
      <div className="absolute bottom-0 flex justify-between items-end w-full px-2 pb-1">
        <div>
          <p className="text-sm text-white">{product.name}</p>
          {product.discount !== 0 ? (
            <div className="py-2 flex flex-col">
              <div className="flex items-center gap-x-2">
                <span className="text-white text-xs bg-red-500 px-1 py-0.5 rounded-full">
                  {product.discount} %
                </span>
                <p className="text-white text-sm line-through">
                  $ {product.price.toFixed(2)}
                </p>
              </div>
              <p className="text-white">$ {product.offPrice.toFixed(2)}</p>
            </div>
          ) : (
            <p className="text-white pb-2 pt-7">
              $ {product.offPrice.toFixed(2)}
            </p>
          )}
        </div>
        <div className="flex gap-x-2">
          <Link href={`/products/${product._id}`}>
            <button className="p-1.5 bg-primary-500 text-white rounded-lg mb-1 cursor-pointer">
              <FaEye className="text-xl" />
            </button>
          </Link>
          {user?.user?.cart?.items.some(
            (p) => p.product._id === product._id
          ) ? (
            <button
              onClick={() =>
                actionHandler({
                  action: "removeFromCart",
                  productId: product._id,
                })
              }
              className="p-1.5 text-red-500 rounded-lg bg-red-300 mb-1 cursor-pointer"
            >
              <FaRegTrashAlt className="text-xl" />
            </button>
          ) : (
            <button
              onClick={() =>
                actionHandler({ action: "addToCart", productId: product._id })
              }
              className="p-1.5 text-white rounded-lg bg-primary-500 mb-1 cursor-pointer"
            >
              <LiaCartPlusSolid className="text-xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
