import { createPayment, getAllPayments, getPayment } from "@/services/paymentService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreatePayment = () =>
  useMutation({
    mutationFn: createPayment,
  });

export const useGetPayments = (userId) => {
  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ["get-payments" , userId],
    queryFn: () => getPayment(userId),
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { payments, paymentsLoading };
};

//only admin
export const useGetAllPayments = (query = "") => {
  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ["get-all-payments" , query],
    queryFn:  () => getAllPayments(query),
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { payments, paymentsLoading };
};
