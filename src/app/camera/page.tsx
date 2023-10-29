"use client";
import style from "@/styles/pages/_camerapage.module.scss";
import Webcam from "react-webcam";
import { FC, useRef, useState, useEffect } from "react";
import { Camera } from "@/components";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";
import { Routes } from "@/utils/path";
import button from "@/styles/components/_button.module.scss";

const videoConstraints = {
  width: 420,
  height: 800,
  facingMode: "user",
};

const Page: FC = ({}) => {
  const router = useRouter();
  const webRef = useRef<Webcam>(null);
  const [img, setImage] = useState<string | null>(null);
  const showImage = () => {
    const Image = webRef.current?.getScreenshot();
    if (Image) setImage(Image);
  };
  console.log(img);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <FontAwesomeIcon
          icon={icon.faArrowLeftLong}
          onClick={() => router.push(`${Routes.HOME_PAGE}`)}
        />
      </div>
      <div className={style.camera}>
        <Webcam
          ref={webRef}
          audio={false}
          height={800}
          screenshotFormat="image/jpeg"
          width={420}
          videoConstraints={videoConstraints}
          mirrored={true}
        />
      </div>
      <div className={style.container_button}>
        <FontAwesomeIcon
          icon={icon.faCircle}
          className={button.circleCameraButton}
          onClick={() => showImage()}
        />
      </div>
    </div>
  );
};

export default Page;
