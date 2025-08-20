"use client";
import Image from "next/image";
import {
  HiOutlineSearch,
  HiOutlinePlusSm,
  HiOutlineHeart,
  HiHeart,
} from "react-icons/hi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import Filter from "@/components/Filter";
import { useGetAllProducts } from "@/hooks/useProducts";
import { useGetUser, useLikeAndSaveProduct } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Products = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useLikeAndSaveProduct();
  const { user } = useGetUser();
  const { products, productsLoading } = useGetAllProducts();
  const { count, data } = products || {};

  const likeAndSaveHandler = async (action) => {
    try {
      if (user && products) {
        const res = await mutateAsync({ id: user.user._id, data: action });
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

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
        {productsLoading
          ? "loading..."
          : products &&
            user && (
              <article className="col-span-9">
                <h2 className="pb-6 text-secondary-500 text-lg font-semibold">
                  plants ({count})
                </h2>
                <div className="grid grid-cols-12 gap-x-6 gap-y-10">
                  {data.map((p) => {
                    return (
                      <div
                        key={p._id}
                        className="rounded-lg col-span-3 bg-primary-200 relative h-52"
                      >
                        <div className="absolute left-2 top-2 flex gap-x-1">
                          <button
                            onClick={() =>
                              likeAndSaveHandler({
                                action: "like",
                                productId: p._id,
                              })
                            }
                            className="text-red-500 text-2xl cursor-pointer"
                          >
                            {user.user.likes.some((l) => l._id === p._id) ? (
                              <HiHeart />
                            ) : (
                              <HiOutlineHeart />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              likeAndSaveHandler({
                                action: "save",
                                productId: p._id,
                              })
                            }
                            className="text-primary-500 text-xl cursor-pointer"
                          >
                            {user.user.saved.some((l) => l._id === p._id) ? (
                              <FaBookmark />
                            ) : (
                              <FaRegBookmark />
                            )}
                          </button>
                        </div>
                        <div className="absolute top-10 left-2 rounded-full text-xs text-white bg-primary-500 px-2 py-1">
                          {p.category.name}
                        </div>
                        <div className="absolute w-44 h-44 left-[80px] -top-12">
                          <Image
                            src={p.images}
                            alt={p.name}
                            fill
                            className="object-contain product-image"
                          />
                        </div>
                        <div className="absolute bottom-0 flex justify-between items-end w-full px-2 pb-1">
                          <div>
                            <p className="text-sm text-white">{p.name}</p>
                            <p className="text-sm text-white py-2">
                              $ {p.offPrice}
                            </p>
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
            )}
      </article>
    </section>
  );
};

export default Products;
