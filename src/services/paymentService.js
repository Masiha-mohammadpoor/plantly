import http from "./httpServices";

export const createPayment = (data) => {
  return http.post("/payments/checkout", data).then((res) => res.data);
};

export const getAllPayments = () => {
  return http.get("/payments").then((res) => res.data);
};

export const getPayment = (id) => {
  return http.get(`/payments/${id}`).then((res) => res.data);
};

