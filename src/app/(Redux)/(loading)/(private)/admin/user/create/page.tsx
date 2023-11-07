"use client";
import { FC } from "react";
import style from "@/styles/pages/_create-user.module.scss";
import { useForm } from "react-hook-form";
import { InputForm, Loading } from "@/components";
import { CreateUser } from "@/utils/types";
import { apiCreateUserByAdmin } from "@/api/user";
import { Axios, AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { showModel } from "@/redux/app";

const Page: FC = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateUser>();
  const handleCreateUser = async (data: CreateUser) => {
    dispatch(showModel({ isShowModel: true, modelChildren: <Loading /> }));
    await apiCreateUserByAdmin(data)
      .then((rs: AxiosResponse) => {
        if (rs.status >= 400 && rs.status <= 599)
          toast.error(rs.data.message[0]);
        if (rs.status >= 200 && rs.status <= 399) {
          dispatch(showModel({ isShowModel: false, modelChildren: null }));
          toast.success("created successfully");
        }
      })
      .catch((err: AxiosError) => toast.error("something went wrong!"));
  };
  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className={style.top}>
          <div className={style.title}>
            <h1>Create a user</h1>
          </div>
          <button
            type="submit"
            className={style.button}
            disabled={!isDirty || !isValid}
          >
            Add user
          </button>
        </div>
        <div className={style.containerInput}>
          <div className={style.topInput}>
            <h1 className={style.title}>Basic information</h1>
          </div>
          <div className={style.center}>
            <div className={style.container}>
              <label className={style.label} htmlFor="email">
                Email
              </label>
              <InputForm
                style={style.input}
                register={register}
                fullW
                id="email"
              />
            </div>
            <div className={style.container}>
              <label className={style.label} htmlFor="hoTen">
                Ho ten
              </label>
              <InputForm
                validate={{ required: "Missing input" }}
                style={style.input}
                register={register}
                fullW
                id="hoTen"
              />
            </div>
            <div className={style.container}>
              <label className={style.label} htmlFor="sdt">
                So dien thoai
              </label>
              <InputForm
                validate={{ required: "Missing input" }}
                style={style.input}
                register={register}
                fullW
                id="sdt"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
