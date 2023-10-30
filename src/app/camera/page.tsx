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
import { useWindowSize } from "@/components/server/getSize";

const Page: FC = ({}) => {
  const router = useRouter();
  const webRef = useRef<Webcam>(null);
  const [img, setImage] = useState<string | null>(null);
  const showImage = () => {
    const Image = webRef.current?.getScreenshot();
    if (Image) setImage(Image);
  };
  const a = useWindowSize();
  console.log(img);

  let videoConstraints = {
    facingMode: "user",
    width: a.width,
    height: a.height,
  };

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
        <div className={style.container_button}>
          <FontAwesomeIcon
            icon={icon.faCircle}
            className={style.icon}
            onClick={() => showImage()}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
