import { FC } from "react";
import style from "@/styles/pages/_homepage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";

const Page: FC = ({}) => {
  return (
    <div className={style.container}>
      <div className={style.top}>
        <FontAwesomeIcon icon={icon.faFileImage} className={style.icon} />
        <div className={style.container_text}>
          <p>You need to Upload your</p>
          <span>Form register</span>
        </div>
      </div>
      <div className={style.button}>
        <FontAwesomeIcon icon={icon.faCamera} className={style.icon} />
        <p>Use Camera</p>
      </div>
      <div className={style.bottom}>
        <div className={style.container_bottom}>
          <FontAwesomeIcon icon={icon.faImage} className={style.icon} />
          <div>
            <span>Select the documents from Gallery</span>
            <p>PNG_JPEG</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
