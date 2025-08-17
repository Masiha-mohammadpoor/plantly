import { signin, signup, updateUser } from "@/services/usersService";
import { useMutation } from "@tanstack/react-query";

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
