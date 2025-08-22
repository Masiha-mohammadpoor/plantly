import { getAllCategories } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";


export const useGetAllCategories = () => {
  const { data : categories, isLoading : categoriesLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getAllCategories,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { categories, categoriesLoading };
};
