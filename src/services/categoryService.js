import http from "./httpServices";

export const getAllCategories = () => {
  return http.get("/categories").then((res) => res.data);
};

export const getCategory = (id) => {
  return http.get(`/categories/${id}`).then((res) => res.data);
};

export const createCategory = (data) => {
  return http.post("/categories" , data).then((res) => res.data);
}

export const updateCategory = ({id , data}) => {
  return http.put(`/categories/${id}` , data).then((res) => res.data);
}

export const deleteCategory = (id) => {
  return http.delete(`/categories/${id}`).then((res) => res.data);
}
