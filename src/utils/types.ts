export type formRegister = {
  hoTen: string;
  sdt: string;
  heDaoTao: string;
  nganhHoc: string[];
};

export type Login = {
  email: string;
  password: string;
};

export type CreateUser = {
  hoTen: string;
  sdt: string;
  email: string;
};

export type Users = {
  users: User[];
  counts: number;
};

export type User = {
  _id: string;
  email: string;
  hoTen: string;
  heDaoTao: string;
  nganhHoc: string[];
  password?: string;
  sdt: string;
  role: string;
};

export type UpdateUserByAdmin = {
  hoTen: string;
  password: string;
  role: string;
};
