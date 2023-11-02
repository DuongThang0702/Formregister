"use client";
import { FC } from "react";
import style from "@/styles/pages/_create-user.module.scss";
import { useForm } from "react-hook-form";
import { InputForm } from "@/components";
import { CreateUser } from "@/utils/types";

const Page: FC = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateUser>();
  const handleCreateUser = (data: CreateUser) => {
    console.log(data);
  };
  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className={style.top}>
          <div className={style.title}>
            <h1>Create a user</h1>
          </div>
          <button type="submit" className={style.button}>
            Add user
          </button>
        </div>
        <div className={style.containerInput}>
          <div className={style.topInput}>
            <h1 className={style.title}>Basic information</h1>
          </div>
          <div className={style.center}>
            <div className={style.container}>
              <label className={style.label} htmlFor="username">
                Username
              </label>
              <InputForm
                style={style.input}
                register={register}
                fullW
                id="username"
              />
            </div>
            <div className={style.container}>
              <label className={style.label} htmlFor="password">
                Passowrd
              </label>
              <InputForm
                style={style.input}
                register={register}
                fullW
                id="passowrd"
                type="password"
              />
            </div>
            <div className={style.container}>
              <label className={style.label} htmlFor="hoTen">
                Ho ten
              </label>
              <InputForm
                style={style.input}
                register={register}
                fullW
                id="hoTen"
              />
            </div>
            <div className={style.container}>
              <label className={style.label} htmlFor="heDaoTao">
                He dao tao
              </label>
              <InputForm
                style={style.input}
                register={register}
                fullW
                id="heDaoTao"
              />
            </div>
            <div className={style.container}>
              <label className={style.label} htmlFor="nganhHoc">
                Nganh hoc
              </label>
              <InputForm
                style={style.input}
                register={register}
                fullW
                id="nganhHoc"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
