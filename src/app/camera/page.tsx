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

const Page: FC = ({}) => {
  const router = useRouter();
  const webRef = useRef<Webcam>(null);
  const [img, setImage] = useState<string | null>(null);
  const showImage = () => {
    const Image = webRef.current?.getScreenshot();
    if (Image) setImage(Image);
  };
  let videoConstraints = {
    facingMode: "environment",
    width: 0,
    height: 0,
  };
  if (typeof window !== "undefined") {
    const elem =
      document.compatMode === "CSS1Compat"
        ? document.documentElement
        : document.body;
    videoConstraints = {
      facingMode: "environment",
      width: elem.clientWidth,
      height: elem.clientHeight,
    };
  } else {
    videoConstraints = {
      facingMode: "environment",
      width: 375,
      height: 650,
    };
  }

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
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          width={videoConstraints.width}
          height={videoConstraints.height - 100}
          mirrored={false}
        />
        <div className={style.container_button}>
          <FontAwesomeIcon
            icon={icon.faCircle}
            className={button.circleCameraButton}
            onClick={() => showImage()}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
