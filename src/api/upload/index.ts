import axiosClient from "../config";

export const Upload = (data: any) =>
  axiosClient({ url: `/cloudinary`, method: "post", data });
