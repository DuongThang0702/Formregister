"use client";
import { FC, Fragment, useEffect } from "react";
import style from "@/styles/pages/_formPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useForm } from "react-hook-form";
import { InputForm } from "@/components";
import { formRegister } from "@/utils/types";
import { checkBoxTrainingSystem } from "@/utils/contants";
import Image from "next/image";
import { showModel } from "@/redux/app";

const Page: FC = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { link } = useSelector((state: RootState) => state.link);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formRegister>();
  const onSubmit = (data: formRegister) => console.log(data);

  console.log(link);

  return (
    <div className={style.container}>
      <div className={style.top}>
        <div className={style.logo}>
          <Image src={"/logo.png"} height={1000} width={1000} alt="logo" />
        </div>
        <div className={style.title}>Khảo sát môn học</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.formRegister}>
        <button type="submit" className={style.buttonSubmit}>
          Đăng ký
        </button>
        <div>
          <div className={style.header}>
            <h1>Thông tin cá nhân</h1>
          </div>
          <div className={style.containerInput}>
            <InputForm
              register={register}
              id="name"
              fullW
              placeholder="Họ và tên"
            />
            <InputForm
              register={register}
              id="phoneNumber"
              type="number"
              fullW
              placeholder="Điện thoại"
            />
          </div>
        </div>
        <div>
          <div className={style.header}>
            <h1>Hệ đào tạo</h1>
          </div>
          <div className={style.containerRadio}>
            <InputForm
              register={register}
              id="trainingSystem"
              type="radio"
              value="CDCQ"
              content="Cao đẳng chính quy (Tốt nghiệp THPT)"
              fullW
            />
            <InputForm
              register={register}
              id="trainingSystem"
              type="radio"
              value="CD9+"
              content="Cao đẳng 9+"
              fullW
            />
          </div>
        </div>
        <div>
          <div className={style.header}>
            <h1>Bạn quan tâm đến ngành nào trong cách ngành sau đây ? </h1>
          </div>
          <div className={style.containerCheckbox}>
            {checkBoxTrainingSystem.map((el) => (
              <div key={el.id}>
                <InputForm
                  register={register}
                  id="theIndustryCares"
                  type="checkbox"
                  value={el.value}
                  content={el.content}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
      ;
    </div>
  );
};

export default Page;
