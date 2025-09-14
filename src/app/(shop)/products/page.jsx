"use client";
import Filter from "@/components/Filter";
import { useGetAllProducts } from "@/hooks/useProducts";
import { useGetUser, useUpdateUser } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Product from "@/components/Product";
import { use, useState } from "react";
import queryString from "query-string";
import Search from "@/components/Search";
import NoProduct from "@/components/NoProduct";
import Loading from "@/components/Loading";
import { ImSortAmountDesc } from "react-icons/im";

const Products = ({ searchParams }) => {
  const [showFilter, setShowFilter] = useState(false);
  const params = use(searchParams);
  const result = queryString.stringify(params);

  const queryClient = useQueryClient();
  const { mutateAsync } = useUpdateUser();
  const { user } = useGetUser();
  const { products, productsLoading } = useGetAllProducts(result);
  const { count, data } = products || {};

  const actionHandler = async (action) => {
    try {
      const res = await mutateAsync({ id: user?.user?._id, data: action });
      if (action.action === "addToCart") toast.success("Added to cart");
      if (action.action === "removeFromCart")
        toast.success("Removed from cart!");
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <section className="mt-10 flex flex-col overflow-x-hidden">
      <article className="flex flex-col justify-center items-center">
        <Search />
      </article>
      <article className="mt-10 px-4 grid grid-cols-12 justify-center gap-8">
        {productsLoading ? (
          <div className="col-span-12">
            <Loading />
          </div>
        ) : (
          products && (
            <>
              <Filter showFilter={showFilter} setShowFilter={setShowFilter} />
              <article className="col-span-12 xl:col-span-9 overflow-y-auto overflow-x-hidden pb-20 pl-4">
                <div className="w-full flex justify-between items-center pb-10 xl:pb-6 px-6 mr-2">
                  <h2 className=" text-secondary-500 text-lg font-semibold">
                    plants ({count})
                  </h2>
                  <button
                    onClick={() => setShowFilter((prev) => !prev)}
                    className="z-[100] text-white w-9 h-9 flex justify-center items-center bg-primary-200 rounded-lg cursor-pointer xl:hidden"
                  >
                    <ImSortAmountDesc />
                  </button>
                </div>
                <div className="grid grid-cols-12 gap-x-6 gap-y-10">
                  {data.length > 0 ? (
                    data.map((product) => {
                      return (
                        <Product
                          key={product._id}
                          product={product}
                          user={user || null}
                          actionHandler={actionHandler}
                        />
                      );
                    })
                  ) : (
                    <NoProduct />
                  )}
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
