"use client";
import { Loading, Slider, useWindowSize } from "@/components";
import { AppDispatch, RootState } from "@/redux/store";
import { Routes } from "@/utils/path";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "@/styles/pages/_previewpage.module.scss";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import { canvasPreview, dataUrlToFile } from "@/utils/helper";
import { showModel } from "@/redux/app";
import axios, { AxiosError, AxiosResponse } from "axios";
import { passLink } from "@/redux/link";
import imageCompression from "browser-image-compression";

const Page: FC = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { url } = useSelector((state: RootState) => state.link);
  const router = useRouter();
  const [rotation, setRotation] = useState<number>(0);
  const [crop, setCrop] = useState<Crop>({
    unit: "%", // Can be 'px' or '%'
    x: 0,
    y: 30,
    width: 50,
    height: 10,
  });

  const imgRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const handleOnRotation = useCallback((rotationValue: number) => {
    setRotation(rotationValue);
  }, []);
  const download = async () => {
    const response = await canvasPreview(imgRef.current, completedCrop);
    const options = {
      maxSizeMB: 1,
      useWebWorker: true,
      maxWidthOrHeight: 1920,
    };
    if (response) {
      const formData = new FormData();
      dispatch(showModel({ isShowModel: true, modelChildren: <Loading /> }));
      const conpressedFile = await imageCompression(response, options);
      formData.append("file", conpressedFile);
      formData.append("upload_preset", "form_survey");
      await axios
        .post(process.env.NEXT_PUBLIC_API_UPLOAD_IMAGE as string, formData)
        .then((rs: AxiosResponse) => {
          dispatch(showModel({ isShowModel: false, modelChildren: null }));
          dispatch(passLink({ link: rs.data.secure_url }));
          router.push(`/${Routes.FORM}`);
        })
        .catch((err: AxiosError) => {
          router.push(`/${Routes.FORM}`);
        });
    }
  };
  const sizeScreen = useWindowSize();
  useEffect(() => {
    if (!url) router.push(`/${Routes.FORM}`);
    if (sizeScreen.width && sizeScreen.width >= 1200)
      router.push(`/${Routes.FORM}`);
  }, []);

  return (
    url && (
      <div className={style.container}>
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(e) => {
            if (e?.height == 0 || e?.width == 0) {
              setCompletedCrop({
                x: 0,
                y: 0,
                height: parseInt(height),
                width: parseInt(width),
                unit: "px",
              });
            } else {
              setCompletedCrop(e);
            }
          }}
          className={style.crop}
        >
          <div className={style.block}>
            <Image
              src={url}
              alt="image"
              ref={imgRef}
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
              height={1000}
              width={1000}
              className={`${style.image}`}
            />
          </div>
        </ReactCrop>
        <div>
          <Slider
            min={0}
            max={360}
            defaultValue={0}
            value={rotation}
            label="Rotate"
            onChange={handleOnRotation}
          />
        </div>
        <div onClick={download} className={style.button}>
          Submit
        </div>
      </div>
    )
  );
};

export default Page;
