export type formRegister = {
  name: string;
  phoneNumber: number;
  trainingSystem: string;
  theIndustryCares: string[];
};

export type Login = {
  id: string;
  password: string;
};

export type CreateUser = {
  username: string;
  password: string;
  hoTen: string;
  heDaoTao: string;
  nganhHoc: string;
};

export type Users = {
  users: User[];
  counts: number;
};

export type User = {
  _id: string;
  username: string;
  hoTen: string;
  heDaoTao: string;
  nganhHoc: string;
  password?: string;
  sdt?: string;
  role: string;
};
