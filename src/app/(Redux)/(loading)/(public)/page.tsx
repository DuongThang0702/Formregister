"use client";
import { FC } from "react";
import style from "@/styles/pages/_login.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { InputForm } from "@/components";
import { Login } from "@/utils/types";
import { Routes } from "@/utils/path";

const Page: FC = ({}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Login>();
  const onSubmit = (data: Login) => {
    console.log(data);
    router.push(`/${Routes.SYSTEM}`);
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
          <label htmlFor="id">Mã nhân viên</label>
          <InputForm
            id="id"
            register={register}
            fullW
            errors={errors.id?.message}
          />
        </div>
        <div className={style.containerInput}>
          <label htmlFor="passowrd">Password</label>
          <InputForm
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
