import {
  getLoggedInUser,
  signin,
  signup,
  updateUser,
} from "@/services/usersService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSignup = () =>
  useMutation({
    mutationFn: signup,
  });

export const useSignin = () =>
  useMutation({
    mutationFn: signin,
  });

export const useUpdateUser = () =>
  useMutation({
    mutationFn: updateUser,
  });

export const useGetUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: getLoggedInUser,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading };
};
