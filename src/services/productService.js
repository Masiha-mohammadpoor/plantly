import http from "./httpServices";

export const createProduct = (data) => {
  return http.post("/products", data).then((res) => res.data);
};

export const getAllProducts = (qs) => {
  return http.get(`/products?${qs}`).then((res) => res.data);
};

export const getProduct = (id) => {
  return http.get(`/products/${id}`).then((res) => res.data);
};

export const updateProduct = (id, data) => {
  return http.put(`/products/${id}`, data).then((res) => res.data);
};

export const deleteProduct = (id) => {
  return http.delete(`/products/${id}`).then((res) => res.data);
};
