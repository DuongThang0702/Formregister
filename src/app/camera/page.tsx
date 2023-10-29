"use client";
import style from "@/styles/pages/_camerapage.module.scss";
import Webcam from "react-webcam";
import { FC, useRef, useState, useEffect } from "react";
import { Camera } from "@/components";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";
import { Routes } from "@/utils/path";

const videoConstraints = {
  width: 400,
  height: 646,
  facingMode: "user",
};

const Page: FC = ({}) => {
  const a = usewindowsize();
  const router = useRouter();
  const webRef = useRef<Webcam>(null);
  const [img, setImage] = useState<string | null>(null);

  return (
    <div className={style.container}>
      <FontAwesomeIcon icon={icon.faArrowLeftLong} />
      <Camera
        height={a.height !== undefined ? a.height - 90 : 1}
        width={a.width !== undefined ? a.width : 1}
        webRef={webRef}
        videoConstraints={videoConstraints}
        setImage={setImage}
      />
    </div>
  );
};

function usewindowsize() {
  const [windowsize, setwindowsize] = useState<{
    width: undefined | number;
    height: undefined | number;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleresize = () => {
        setwindowsize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener("resize", handleresize);
      handleresize();
      return () => window.removeEventListener("resize", handleresize);
    }
  }, []);
  return windowsize;
}

export default Page;
