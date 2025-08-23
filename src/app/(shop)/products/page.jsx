"use client";
import { HiOutlineSearch } from "react-icons/hi";
import Filter from "@/components/Filter";
import { useGetAllProducts } from "@/hooks/useProducts";
import { useGetUser, useUpdateUser } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Product from "./Product";
import { use } from "react";
import queryString from "query-string";
import Laoding from "@/components/Loading";
import Search from "@/components/Search";

const Products = ({ searchParams }) => {
  const params = use(searchParams);
  const result = queryString.stringify(params);

  const queryClient = useQueryClient();
  const { mutateAsync } = useUpdateUser();
  const { user } = useGetUser();
  const { products, productsLoading } = useGetAllProducts(result);
  const { count, data } = products || {};

  const actionHandler = async (action) => {
    try {
      if (user && products) {
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

  return (
    <section className="mt-10 flex flex-col">
      <article className="flex flex-col justify-center items-center">
        <Search/>
      </article>
      <article className="mt-10 px-4 grid grid-cols-12 gap-8">
        {productsLoading ? (
          <div className="col-span-12">
            <Laoding />
          </div>
        ) : (
          products &&
          user && (
            <>
              <Filter />
              <article className="col-span-9 h-96 overflow-y-auto overflow-x-hidden pb-20">
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
            </>
          )
        )}
      </article>
    </section>
  );
};

export default Products;
