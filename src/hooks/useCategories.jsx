import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "@/services/categoryService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateCategory = () =>
  useMutation({
    mutationFn: createCategory,
  });

export const useUpdateCategory = () =>
  useMutation({
    mutationFn: updateCategory,
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

export const useGetCategory = (id) => {
  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ["get-category", id],
    queryFn: () => getCategory(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { category, categoryLoading };
};
