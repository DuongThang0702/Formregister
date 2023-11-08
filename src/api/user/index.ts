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

export const apiUpdateUser = (uid: string, data: object) =>
  axiosClient({
    url: `/user/${uid}`,
    method: "patch",
    data,
  });

export const apiCreateAdmission = (data: object) =>
  axiosClient({ url: "/admission", method: "post", data });
