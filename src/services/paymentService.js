import http from "./httpServices";

export const createPayment = (data) => {
  return http.post("/payments/checkout", data).then((res) => res.data);
};

export const getPayment = (id) => {
  return http.get(`/payments/user/${id}`).then((res) => res.data);
};

// only admin
export const getAllPayments = (query) => {
  return http.get(`/payments${query}`).then((res) => res.data);
};
