import http from "./httpServices";

export const createProduct = (data) => {
  return http.post("/products", data).then((res) => res.data);
};

export const getAllProducts = () => {
  return http.get("/products").then((res) => res.data);
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
