"use client";
import style from "@/styles/pages/_camerapage.module.scss";
import Webcam from "react-webcam";
import { FC, useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";
import { useWindowSize } from "@/components/";
import { dataUrlToFile } from "@/utils/helper";
import { useForm } from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";

const Page: FC = ({}) => {
  const sizeWindow = useWindowSize();
  const router = useRouter();
  const webRef = useRef<Webcam>(null);
  const [img, setImage] = useState<any>(null);
  const [linkImg, setLinkImg] = useState<string | null>(null);

  const videoConstraints = {
    facingMode: process.env.NEXT_PUBLIC_CAMERA,
    width: sizeWindow.width,
    height: sizeWindow.height,
  };
  const handleSendImage = async (base64: string) => {
    const formData = new FormData();
    const file = await dataUrlToFile(base64);
    formData.append("form", file);
    await axios({
      data: formData,
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      url: `${process.env.NEXT_PUBLIC_API_UPLOAD_IMAGE}/cloudinary`,
    })
      .then((rs: AxiosResponse) => {
        if (rs.status >= 400 && rs.status <= 599)
          console.log("something went wrong");
        else setLinkImg(rs.data);
      })
      .catch((err: AxiosError) => console.log(err));
  };

  const capturePhoto = useCallback(async () => {
    const imgSrc = webRef.current?.getScreenshot();
    setImage(imgSrc);
  }, [webRef]);

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
