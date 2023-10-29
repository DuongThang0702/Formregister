import { Dispatch, FC, RefObject, SetStateAction } from "react";
import style from "@/styles/components/_camera.module.scss";
import button from "@/styles/components/_button.module.scss";
import Webcam from "react-webcam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";
interface Props {
  webRef: RefObject<Webcam>;
  videoConstraints: object;
  width: number;
  height: number;
  setImage: Dispatch<SetStateAction<string | null>>;
}

const Page: FC<Props> = ({
  webRef,
  videoConstraints,
  width,
  height,
  setImage,
}) => {
  const showImage = () => {
    const Image = webRef.current?.getScreenshot();
    if (Image) setImage(Image);
  };
  return (
    <>
      <div className={style.camera}>
        <Webcam
          ref={webRef}
          audio={false}
          height={height}
          screenshotFormat="image/jpeg"
          width={width}
          videoConstraints={videoConstraints}
          mirrored={true}
        />
        <div className={style.container_button}>
          <FontAwesomeIcon
            icon={icon.faCircle}
            className={button.circleCameraButton}
            onClick={() => showImage()}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
