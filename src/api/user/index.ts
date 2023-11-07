import axiosClient from "../config";

export const apiLogin = (data: any) =>
  axiosClient({
    url: "/auth/login",
    method: "post",
    data,
  });

export const apiCreateUserByAdmin = (data: any) =>
  axiosClient({
    url: "/auth/register",
    method: "post",
    data,
  });
