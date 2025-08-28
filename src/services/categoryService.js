import http from "./httpServices";

export const getAllCategories = () => {
  return http.get("/categories").then((res) => res.data);
};

export const createCategory = (data) => {
  return http.post("/categories" , data).then((res) => res.data);
}
