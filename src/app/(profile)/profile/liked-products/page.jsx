"use client";
import Loading from "@/components/Loading";
import NoProduct from "@/components/NoProduct";
import Product from "@/components/Product";
import { useGetUser, useUpdateUser } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const LikeAndSave = () => {
  const queryClient = useQueryClient();
  const { user, userLoading } = useGetUser();
  const { mutateAsync } = useUpdateUser();

  const actionHandler = async (action) => {
    try {
      if (user) {
        const res = await mutateAsync({ id: user.user._id, data: action });
        if (action.action === "like") toast.success("Product like removed!!");
        if (action.action === "addToCart") toast.success("Added to cart");
        if (action.action === "removeFromCart")
          toast.success("Removed from cart!");
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  if (!userLoading && user?.user?.likes.length === 0) {
    return <NoProduct text="There is no Product." link />;
  }
  return (
    <section className="w-full bg-white rounded-tl-lg h-screen pb-28 px-4 lg:px-8 pt-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">Liked Products</h2>

      {!user && userLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-12 gap-x-9 gap-y-12 justify-center">
          {user?.user?.likes.map((p) => {
            return (
              <Product
                key={p._id}
                product={p}
                user={user}
                actionHandler={actionHandler}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default LikeAndSave;
