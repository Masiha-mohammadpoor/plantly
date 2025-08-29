import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateProduct = () =>
  useMutation({
    mutationFn: createProduct,
  });

export const useUpdateProduct = () =>
  useMutation({
    mutationFn: updateProduct,
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

export const useGetProduct = (id) => {
  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ["get-product", id],
    queryFn: () => getProduct(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { product, productLoading };
};
