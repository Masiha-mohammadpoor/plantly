import {
  createProduct,
  deleteProduct,
  getAllProducts,
} from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateProduct = () =>
  useMutation({
    mutationFn: createProduct,
  });

export const useDeleteProduct = () =>
  useMutation({
    mutationFn: deleteProduct,
  });

export const useGetAllProducts = (searchParams) => {
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["get-products", searchParams],
    queryFn: () => getAllProducts(searchParams),
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { products, productsLoading };
};
