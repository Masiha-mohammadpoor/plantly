import { createPayment } from "@/services/paymentService";
import { useMutation } from "@tanstack/react-query";

export const useCreatePayment = () =>
  useMutation({
    mutationFn: createPayment,
  });
