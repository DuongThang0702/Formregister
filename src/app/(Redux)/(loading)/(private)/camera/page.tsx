"use client";
import style from "@/styles/pages/_camerapage.module.scss";
import Webcam from "react-webcam";
import { FC, useRef, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";
import { useWindowSize } from "@/components/";
import { dataUrlToFile } from "@/utils/helper";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { passLink } from "@/redux/link";
import { Routes } from "@/utils/path";
import { showModel } from "@/redux/app";
import { v4 as uuidv4 } from "uuid";

const Page: FC = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const sizeWindow = useWindowSize();
  const router = useRouter();
  const webRef = useRef<Webcam>(null);
  const randomString = uuidv4();
  let img: any = "";

  const videoConstraints = {
    facingMode: process.env.NEXT_PUBLIC_CAMERA,
    width: sizeWindow.width,
    height: sizeWindow.height,
  };
  const handleSendImage = async (base64: string) => {
    const formData = new FormData();
    const file = await dataUrlToFile(base64, randomString);
    dispatch(showModel({ isShowModel: true, modelChildren: <h1>Loading</h1> }));
    formData.append("file", file);
    formData.append("upload_preset", "form_survey");
    await axios
      .post(process.env.NEXT_PUBLIC_API_UPLOAD_IMAGE as string, formData)
      .then((rs: AxiosResponse) => {
        dispatch(showModel({ isShowModel: false, modelChildren: null }));
        dispatch(passLink({ link: rs.data.url }));
        console.log(rs);
        router.push(`/${Routes.FORM}`);
      })
      .catch((err: AxiosError) => {
        router.push(`/${Routes.FORM}`);
        console.log(err);
      });
  };

  const capturePhoto = useCallback(async () => {
    img = webRef.current?.getScreenshot();
    handleSendImage(img);
  }, []);

  useEffect(() => {
    if (sizeWindow.width && sizeWindow.width >= 1200)
      router.push(`/${Routes.FORM}`);
  }, [sizeWindow]);

  return (
    <div className={style.container}>
      <div className={style.camera}>
        <Webcam
          ref={webRef}
          audio={false}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          width={videoConstraints.width}
          height={videoConstraints.height}
          mirrored={false}
        />
        <button type="submit" className={style.container_button}>
          <FontAwesomeIcon
            icon={icon.faCircle}
            className={style.icon}
            onClick={() => capturePhoto()}
          />
        </button>
      </div>
    </div>
  );
};

export default Page;
