"use client";
import Image from "next/image";
import { HiOutlinePlusSm, HiOutlineHeart, HiHeart } from "react-icons/hi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";

const Product = ({ product, user, actionHandler }) => {
  return (
    <div className="rounded-lg col-span-3 bg-primary-200 relative h-52">
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
          {user.user.likes.some((l) => l._id === product._id) ? (
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
          {user.user.saved.some((l) => l._id === product._id) ? (
            <FaBookmark />
          ) : (
            <FaRegBookmark />
          )}
        </button>
      </div>
      <div className="absolute top-10 left-2 rounded-full text-xs text-white bg-primary-500 px-2 py-1">
        {product.category.name}
      </div>
      <div className="absolute w-44 h-44 left-[80px] -top-12">
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
          <p className="text-sm text-white py-2">$ {product.offPrice}</p>
        </div>
        <button
          onClick={() =>
            actionHandler({ action: "addToCart", productId: product._id })
          }
          className="p-1.5 text-white rounded-lg bg-primary-500 mb-1 cursor-pointer"
        >
          <HiOutlinePlusSm />
        </button>
      </div>
    </div>
  );
};

export default Product;
