import { createProduct, getAllProducts } from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateProduct = () =>
  useMutation({
    mutationFn: createProduct,
  });

export const useGetAllProducts = () => {
  const { data : products, isLoading : productsLoading } = useQuery({
    queryKey: ["get-products"],
    queryFn: getAllProducts,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { products, productsLoading };
};
