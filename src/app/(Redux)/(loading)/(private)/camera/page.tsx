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

const Page: FC = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const sizeWindow = useWindowSize();
  const router = useRouter();
  const webRef = useRef<Webcam>(null);
  const [img, setImage] = useState<any>(null);

  const videoConstraints = {
    facingMode: process.env.NEXT_PUBLIC_CAMERA,
    width: sizeWindow.width,
    height: sizeWindow.height,
  };
  const handleSendImage = async (base64: string) => {
    const formData = new FormData();
    const file = await dataUrlToFile(base64);
    formData.append("file", file);
    formData.append("upload_preset", "form_survey");
    dispatch(showModel({ isShowModel: true, modelChildren: <h1>Loading</h1> }));
    await axios({
      data: formData,
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      url: process.env.NEXT_PUBLIC_API_UPLOAD_IMAGE,
    })
      .then((rs: AxiosResponse) => {
        dispatch(showModel({ isShowModel: false, modelChildren: null }));
        if (rs.status >= 400 && rs.status <= 599) {
          router.push(`/${Routes.FORM}`);
        } else {
          dispatch(passLink({ link: rs.data.url }));
          router.push(`/${Routes.FORM}`);
        }
      })
      .catch((err: AxiosError) => {
        dispatch(showModel({ isShowModel: false, modelChildren: null }));
        router.push(`/${Routes.FORM}`);
        console.log(err);
      });
  };

  const capturePhoto = useCallback(async () => {
    const imgSrc = webRef.current?.getScreenshot();
    setImage(imgSrc);
  }, [webRef]);

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
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          width={videoConstraints.width}
          height={videoConstraints.height}
          mirrored={false}
        />
        <button
          type="submit"
          className={style.container_button}
          onClick={() => handleSendImage(img)}
        >
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
