"use client";
import { HiOutlineSearch } from "react-icons/hi";
import Filter from "@/components/Filter";
import { useGetAllProducts } from "@/hooks/useProducts";
import { useGetUser, useUpdateUser } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Product from "./Product";

const Products = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useUpdateUser();
  const { user } = useGetUser();
  const { products, productsLoading } = useGetAllProducts();
  const { count, data } = products || {};

  const actionHandler = async (action) => {
    try {
      if (user && products) {
        const res = await mutateAsync({ id: user.user._id, data: action });
        if(action.action === "addToCart") toast.success("Added to cart");
        if(action.action === "removeFromCart") toast.success("Removed from cart!");
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
                  {data.map((product) => {
                    return (
                      <Product
                        key={product._id}
                        product={product}
                        user={user}
                        actionHandler={actionHandler}
                      />
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
