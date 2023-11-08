"use client";
import { FC, Fragment, useEffect, useState } from "react";
import style from "@/styles/pages/_formPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useForm } from "react-hook-form";
import { InputForm, Loading } from "@/components";
import { formRegister } from "@/utils/types";
import { checkBoxTrainingSystem } from "@/utils/contants";
import Image from "next/image";
import { showModel } from "@/redux/app";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { Routes } from "@/utils/path";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";
import { apiCreateAdmission } from "@/api/user";

const Page: FC = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { link } = useSelector((state: RootState) => state.link);
  const { user } = useSelector((state: RootState) => state.user);
  const [info, setInfo] = useState<{
    dienthoai: string;
    hoten: string;
  }>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formRegister>();
  const onSubmit = async (data: formRegister) => {
    dispatch(showModel({ isShowModel: true, modelChildren: <Loading /> }));
    await axios
      .post(
        `https://api-mogodb.onrender.com/insert_admission?username=${data.name}&sdt=${data.phoneNumber}&hoTen=${data.name}&heDaoTao=${data.trainingSystem}&nganhHoc=${data.theIndustryCares}`
      )
      .then((rs: AxiosResponse) => {
        dispatch(showModel({ isShowModel: false, modelChildren: null }));
        router.push(`/${Routes.SYSTEM}`);
      })
      .catch((err: AxiosError) => console.log(err));

    // await apiCreateAdmission(data)
    //   .then((rs: AxiosResponse) => {
    //     dispatch(showModel({ isShowModel: false, modelChildren: null }));
    //     router.push(`/${Routes.SYSTEM}`);
    //   })
    //   .catch((err: AxiosError) => {
    //     router.push(`/${Routes.SYSTEM}`);
    //     console.log(err);
    //   });
  };

  const fetch = async () => {
    dispatch(showModel({ isShowModel: true, modelChildren: <Loading /> }));
    await axios
      .get(`https://api-mogodb.onrender.com/detect_text?imageUrl=${link}`)
      .then((rs) => {
        dispatch(showModel({ isShowModel: false, modelChildren: null }));
        setInfo({
          dienthoai: rs?.data.data.dienthoai,
          hoten: rs?.data.data.hoten,
        });
      })
      .catch((err: AxiosError) => {
        console.log(err);
        dispatch(showModel({ isShowModel: false, modelChildren: null }));
      });
  };

  useEffect(() => {
    link && fetch();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.top}>
        <div className={style.logo}>
          <Image src={"/logo.png"} height={1000} width={1000} alt="logo" />
        </div>
        <div
          className={style.back}
          onClick={() => router.push(`/${Routes.SYSTEM}`)}
        >
          <FontAwesomeIcon icon={icon.faArrowLeftLong} />
          Back
        </div>
        <div className={style.title}>Khảo sát môn học</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.formRegister}>
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
              validate={{ required: "Missing input" }}
              defaultValue={info?.hoten}
              errors={errors?.name?.message}
            />
            <InputForm
              register={register}
              id="phoneNumber"
              fullW
              placeholder="Điện thoại"
              validate={{ required: "Missing input" }}
              defaultValue={info?.dienthoai}
              errors={errors?.phoneNumber?.message}
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
        <button type="submit" className={style.buttonSubmit}>
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Page;
