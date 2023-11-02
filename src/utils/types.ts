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
