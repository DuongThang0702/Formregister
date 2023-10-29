"use client";
import style from "@/styles/pages/_camerapage.module.scss";
import Webcam from "react-webcam";
import { FC, useRef, useState } from "react";
import { Camera } from "@/components";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";
import { Routes } from "@/utils/path";

const videoConstraints = {
  width: 390,
  height: 700,
  facingMode: { exact: "environment" },
};

const Page: FC = ({}) => {
  const router = useRouter();
  const webRef = useRef<Webcam>(null);
  const [img, setImage] = useState<string | null>(null);

  return (
    <div className={style.container}>
      <div
        className={style.header}
        onClick={() => router.push(`${Routes.HOME_PAGE}`)}
      >
        <FontAwesomeIcon icon={icon.faArrowLeftLong} />
      </div>
      <Camera
        height={700}
        webRef={webRef}
        videoConstraints={videoConstraints}
        width={390}
        setImage={setImage}
      />
    </div>
  );
};

export default Page;
