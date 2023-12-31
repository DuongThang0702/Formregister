"use client";
import style from "@/styles/pages/_camerapage.module.scss";
import Webcam from "react-webcam";
import { FC, useRef, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";
import { Loading, useWindowSize } from "@/components/";
import { dataUrlToFile } from "@/utils/helper";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { passLink, passUrlCapture } from "@/redux/link";
import { Routes } from "@/utils/path";
import { showModel } from "@/redux/app";

const Page: FC = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const sizeWindow = useWindowSize();
  const router = useRouter();
  const webRef = useRef<Webcam>(null);
  let img: any = "";

  const videoConstraints = {
    facingMode: process.env.NEXT_PUBLIC_CAMERA,
    width: sizeWindow.width,
    height: sizeWindow.height,
  };

  const handleSendImage = async (base64: string) => {
    dispatch(passUrlCapture({ url: base64 }));
    router.push(`/${Routes.CAMERA}/${Routes.PREVIEW}`);
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
