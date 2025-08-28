import { createCategory, getAllCategories } from "@/services/categoryService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateCategory = () =>
  useMutation({
    mutationFn: createCategory,
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
