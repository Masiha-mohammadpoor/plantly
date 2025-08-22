import http from "./httpServices";

export const getAllCategories = () => {
  return http.get("/categories").then((res) => res.data);
};
