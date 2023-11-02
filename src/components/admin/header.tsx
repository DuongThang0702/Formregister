import { FC, memo, useEffect, useState } from "react";
import style from "@/styles/components/admin/_header.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";
const Page: FC = ({}) => {
  const [isShowOption, setIsShowOption] = useState<boolean>(false);
  useEffect(() => {
    const handleShowOption = (e: MouseEvent) => {
      const tab = document.getElementById("option");
      if (!tab?.contains(e.target as Node)) setIsShowOption(false);
    };
    document.addEventListener("click", handleShowOption);
    return () => removeEventListener("click", handleShowOption);
  }, []);
  return (
    <div className={style.container}>
      <div
        className={style.block}
        id="option"
        onClick={() => setIsShowOption(true)}
      >
        <Image
          alt="avatar"
          src={"/avatarDefault.png"}
          height={100}
          width={100}
          className={style.avatar}
        />
        <div className={style.block_right}>
          <p className={style.text}>User</p>
          <FontAwesomeIcon
            icon={icon.faChevronRight}
            className={`${isShowOption && style.iconArrow} ${style.icon}`}
          />
        </div>
        {isShowOption && (
          <div className={style.options}>
            <div className={style.tab}>
              <FontAwesomeIcon icon={icon.faUser} className={style.icon} />
              <h1 className={style.text}>Profile</h1>
            </div>

            <div className={style.tab}>
              <FontAwesomeIcon
                icon={icon.faArrowRightFromBracket}
                className={style.icon}
              />
              <h1 className={style.text}>Đăng xuất</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Page);
