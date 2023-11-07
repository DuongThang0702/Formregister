"use client";
import { FC } from "react";
import style from "@/styles/pages/_login.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { InputForm } from "@/components";
import { Login } from "@/utils/types";
import { Routes } from "@/utils/path";
import { apiLogin } from "@/api/user";
import { AxiosError, AxiosResponse } from "axios";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/user";

const Page: FC = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Login>();
  const onSubmit = async (data: Login) => {
    await apiLogin(data)
      .then((rs: AxiosResponse) => {
        if (rs.status >= 400 && rs.status <= 499) {
          toast.error("wrong email or password");
        }
        if (rs.status >= 500 && rs.status <= 599) {
          toast.error("something went wrong");
        }
        if (rs.status >= 200 && rs.status <= 399) {
          toast.success("login success");
          dispatch(login({ user: rs.data }));
          router.push(`/${Routes.SYSTEM}`);
        }
      })
      .catch((err: AxiosError) => console.log(err));
  };
  return (
    <div className={style.wrapper}>
      <div className={style.top}>
        <div className={style.logo}>
          <Image src={"/logo.png"} width={1000} height={1000} alt="logo" />
        </div>
        <h1 className={style.title}>Hệ Thống Quản Lý Tuyển Sinh</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div className={style.containerInput}>
          <label htmlFor="email">Email</label>
          <InputForm
            validate={{ required: "Missing Email" }}
            id="email"
            register={register}
            fullW
            errors={errors.email?.message}
          />
        </div>
        <div className={style.containerInput}>
          <label htmlFor="passowrd">Password</label>
          <InputForm
            validate={{ required: "Missing Password" }}
            id="password"
            type="password"
            register={register}
            fullW
            errors={errors.password?.message}
          />
        </div>
        <button type="submit" className={style.buttonLogin}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Page;
