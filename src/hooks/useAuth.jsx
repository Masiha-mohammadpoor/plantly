import {
  getLoggedInUser,
  logout,
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

export const useLogout = () =>
  useMutation({
    mutationFn: logout,
  });

export const useUpdateUser = () =>
  useMutation({
    mutationFn: updateUser,
  });

export const useGetUser = () => {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: getLoggedInUser,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { user, userLoading };
};
