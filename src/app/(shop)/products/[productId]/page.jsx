"use client";
import Loading from "@/components/Loading";
import { useGetUser, useUpdateUser } from "@/hooks/useAuth";
import { useGetProduct } from "@/hooks/useProducts";
import Image from "next/image";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useQueryClient } from "@tanstack/react-query";

const productPage = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const { product, productLoading } = useGetProduct(params.productId);
  const { data } = product || {};
  const { user, userLoading } = useGetUser();
  const { mutateAsync } = useUpdateUser();

  const actionHandler = async (action) => {
    try {
      if (user && product) {
        const res = await mutateAsync({ id: user.user._id, data: action });
        if (action.action === "addToCart") toast.success("Added to cart");
        if (action.action === "removeFromCart")
          toast.success("Removed from cart!");
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  if (productLoading && userLoading) return <Loading />;
  if (product && !productLoading)
    return (
      <section className="px-20 flex justify-center items-start gap-x-16 mt-16 pb-10">
        {/* image */}
        <article>
          <div className="relative w-[290px] h-[380px] rounded-t-[300px] rounded-b-lg bg-primary-200 custom-shadow">
            <div className="w-[400px] h-[400px] absolute -top-4 -left-15">
              <Image
                src={data?.images}
                alt={data?.name}
                fill
                className="object-contain product-image"
              />
            </div>
          </div>
        </article>
        {/* detail */}
        <article className="mt-5 flex flex-col items-start gap-y-4">
          <div className="left-2 top-2 flex gap-x-1">
            <button
              onClick={() =>
                actionHandler({
                  action: "like",
                  productId: data?._id,
                })
              }
              className="text-red-500 text-2xl cursor-pointer"
            >
              {user.user.likes.some((l) => l._id === data?._id) ? (
                <HiHeart />
              ) : (
                <HiOutlineHeart />
              )}
            </button>
            <button
              onClick={() =>
                actionHandler({
                  action: "save",
                  productId: data?._id,
                })
              }
              className="text-primary-500 text-xl cursor-pointer"
            >
              {user.user.saved.some((l) => l._id === data?._id) ? (
                <FaBookmark />
              ) : (
                <FaRegBookmark />
              )}
            </button>
          </div>
          <p className="text-6xl font-extralight text-secondary-800">
            {data?.name}
          </p>
          <p className="w-[22rem] text-sm text-secondary-500 leading-6">
            {data?.description}
          </p>
          <div className="py-1 px-3 rounded-full bg-primary-200 text-sm text-white ">
            {data?.category?.name}
          </div>
          <div className="py-2 flex flex-col">
            <div className="flex items-center gap-x-2">
              <span className="text-white text-xs bg-red-500 px-2 py-0.5 rounded-full">
                % {data?.discount}
              </span>
              <p className="text-sm line-through">$ {data?.price.toFixed(2)}</p>
            </div>
            <p>$ {data?.offPrice.toFixed(2)}</p>
          </div>
          {user.user.cart.items.some((p) => p.product._id === data._id) ? (
            <button
              onClick={() =>
                actionHandler({ action: "removeFromCart", productId: data._id })
              }
              className="text-red-500 w-80 bg-red-200 rounded-lg custom-shadow cursor-pointer py-1.5 transition-all duration-300 hover:bg-red-300"
            >
              Remove From Cart
            </button>
          ) : (
            <button
              onClick={() =>
                actionHandler({ action: "addToCart", productId: data._id })
              }
              className="text-white w-80 bg-primary-200 rounded-lg custom-shadow cursor-pointer py-1.5 transition-all duration-300 hover:bg-primary-500"
            >
              Add To Cart
            </button>
          )}
        </article>
      </section>
    );
};

export default productPage;
