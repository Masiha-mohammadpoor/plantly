import http from "./httpServices";

export const signup = (data) => {
  return http.post("/users", data).then(res => res.data);
};

export const signin = (data) => {
  return http.post("/auth/signin", data).then(res => res.data);
};

export const getLoggedInUser = () => {
  return http.get("/auth/me").then(res => res.data);
};

export const getAllUser = () => {
  return http.get("/users").then(res => res.data);
};

export const getUser = (id) => {
  return http.get(`/users/${id}`).then(res => res.data);
};

export const deleteUser = (id) => {
  return http.delete(`/users/${id}`).then(res => res.data);
};

export const updateUser = ({id , data}) => {
  return http.put(`/users/${id}` , data).then(res => res.data);
}
