"use client";
import Image from "next/image";
import { LuInfo } from "react-icons/lu";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { useGetUser, useUpdateUser } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";
import EmptyCart from "./EmptyCart";
import Loading from "@/components/Loading";
import { useCreatePayment } from "@/hooks/usePayments";

const Cart = () => {
  const { user: userData, userLoading } = useGetUser();
  const { user } = userData || {};
  const { mutateAsync: updateUserMutateAsync } = useUpdateUser();
  const { mutateAsync: paymentMutateAsunc } = useCreatePayment();
  const queryClient = useQueryClient();
  const [discountCode, setDiscountCode] = useState("");

  const { totalPrice, totalDiscount } = useMemo(() => {
    if (!user || !user.cart || !user.cart.items) {
      return { totalPrice: 0, totalDiscount: 0 };
    }

    return user.cart.items.reduce(
      (acc, item) => {
        const product = item.product;
        const quantity = item.quantity;
        const originalPrice = product.price * quantity;
        const discountedPrice = product.offPrice * quantity;
        const itemDiscount = originalPrice - discountedPrice;

        return {
          totalPrice: acc.totalPrice + originalPrice,
          totalDiscount: acc.totalDiscount + itemDiscount,
        };
      },
      { totalPrice: 0, totalDiscount: 0 }
    );
  }, [user]);

  const actionHandler = async (action) => {
    try {
      if (user) {
        const res = await updateUserMutateAsync({ id: user._id, data: action });
        if (action.action === "removeFromCart")
          toast.success("Removed from cart!");
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  const discountCodeHandler = () => {
    setDiscountCode("");
    toast.error("Wrong Code !!!");
  };

  const paymentHandler = async () => {
    try {
      const data = await paymentMutateAsunc({
        userId: user._id,
        paymentMethod: "online",
      });
      toast.success("Payment was successful !!!");
      queryClient.invalidateQueries(["get-user"]);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  if (userLoading || !user) return <Loading />;
  if (!userLoading && user && user?.cart?.items?.length === 0)
    return <EmptyCart />;
  return (
    <section className="flex flex-col justify-center mt-16 mx-auto px-32 max-w-7xl overflow-y-auto">
      <h1 className="text-xl font-semibold pb-8">
        Your shopping cart ({user?.cart?.items?.length || 0})
      </h1>
      <article className="grid grid-cols-12 gap-8">
        {/* produts */}
        <article className="col-span-8 h-96">
          {/* product */}
          {user?.cart?.items?.map((p) => {
            return (
              <div
                key={p._id}
                className="w-full rounded-lg bg-primary-200 p-2 h-36 flex justify-between mb-5"
              >
                {/* image */}
                <div className="w-44 h-44 -left-5 -top-10 relative">
                  <Image
                    src={p.product.images}
                    alt={p.product.name}
                    fill
                    className="object-contain product-image absolute"
                  />
                </div>
                {/* name & price */}
                <div className="h-full py-2 flex flex-col justify-between pr-10">
                  <div className="flex items-center gap-x-2">
                    <p className="text-white">{p.product.name}</p>
                  </div>
                  <div>
                    {p.product.discount !== 0 ? (
                      <div className="py-2 flex flex-col">
                        <div className="flex items-center gap-x-2">
                          <span className="text-white text-xs bg-red-500 px-1 py-0.5 rounded-full">
                            {p.product.discount} %
                          </span>
                          <p className="text-white text-sm line-through">
                            $ {p.product.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-white">
                          $ {p.product.offPrice.toFixed(2)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-white pb-2 pt-7">
                        $ {p.product.offPrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
                {/* quantity */}
                <div className="h-full flex justify-center items-center gap-x-10 ml-20">
                  <div className="flex flex-col items-center gap-y-1">
                    <p className="text-white">
                      $ {(p.quantity * p.product.offPrice).toFixed(2)}
                    </p>
                    <div className="flex justify-between items-center w-32 h-8 rounded-lg overflow-hidden border-2 border-primary-800">
                      <button
                        onClick={() => {
                          actionHandler({
                            action: "decreaseCartItem",
                            productId: p.product._id,
                          });
                        }}
                        className="flex justify-center items-center w-8 h-full bg-primary-500 text-white cursor-pointer"
                      >
                        <FaMinus />
                      </button>
                      <div className="text-white">{p.quantity}</div>
                      <button
                        onClick={() => {
                          actionHandler({
                            action: "addToCart",
                            productId: p.product._id,
                          });
                        }}
                        className="flex justify-center items-center w-8 h-full bg-primary-500 text-white cursor-pointer"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      actionHandler({
                        action: "removeFromCart",
                        productId: p.product._id,
                      });
                    }}
                    className="p-3 text-red-500 rounded-lg bg-red-300 mb-1 cursor-pointer"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            );
          })}
        </article>
        {/* payment */}
        <article className="h-[23.25rem] col-span-4 bg-white custom-shadow p-4 rounded-lg">
          <h2 className="flex items-center gap-x-2 font-semibold">
            <LuInfo /> Payment Information
          </h2>
          <span className="inline-block w-full border border-secondary-200"></span>
          <div className="flex flex-col gap-y-2 mt-2">
            <p>discount code</p>
            <div className="w-full rounded-lg bg-secondary-200 p-2">
              <input
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                type="text"
                className="w-3/4 border-none outline-none placeholder-secondary-500"
                placeholder="code..."
              />
              <button
                onClick={() => discountCodeHandler()}
                className="w-1/4 cursor-pointer rounded-lg text-white bg-primary-200 py-1"
              >
                send
              </button>
            </div>
          </div>
          <div className="mt-4 w-full flex justify-between items-center">
            <p className="font-semibold">Total Sum</p>
            <p className="text-secondary-500">$ {totalPrice.toFixed(2)}</p>
          </div>
          <div className="mt-4 w-full flex justify-between items-center">
            <p className="font-semibold">Discount</p>
            <p className="text-red-500">-$ {totalDiscount.toFixed(2)}</p>
          </div>
          <span className="mt-2 inline-block w-full border border-secondary-200"></span>
          <div className="mt-4 w-full flex justify-between items-center">
            <p className="font-semibold">Payable</p>
            <p className="text-primary-200 text-lg font-semibold">
              $ {(totalPrice - totalDiscount).toFixed(2)}
            </p>
          </div>
          <button
            onClick={paymentHandler}
            className="mt-4 w-full rounded-lg text-white p-2 bg-primary-200 cursor-pointer"
          >
            Payment
          </button>
        </article>
      </article>
    </section>
  );
};

export default Cart;
