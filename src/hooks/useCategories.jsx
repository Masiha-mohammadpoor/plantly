import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "@/services/categoryService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateCategory = () =>
  useMutation({
    mutationFn: createCategory,
  });

export const useDeletCategory = () =>
  useMutation({
    mutationFn: deleteCategory,
  });

export const useGetAllCategories = () => {
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getAllCategories,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { categories, categoriesLoading };
};
