import { FC, useEffect, useState } from "react";
import style from "@/styles/components/system/_headerSystem.module.scss";
import Image from "next/image";
import Options from "./options";

const Page: FC = ({}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    const handleShowOption = (e: MouseEvent) => {
      const tab = document.getElementById("user");
      if (!tab?.contains(e.target as Node)) setShowOptions(false);
    };
    document.addEventListener("click", handleShowOption);
    return () => removeEventListener("click", handleShowOption);
  }, []);
  return (
    <div className={style.container}>
      <Image
        alt="logo"
        src={"/logo.png"}
        width={1000}
        height={1000}
        className={style.logo}
      />
      <div></div>
      <div
        className={style.options}
        id="user"
        onClick={() => setShowOptions(true)}
      >
        <h1 className={style.text}>Hi, User</h1>
        <Image
          src={"/avatarDefault.png"}
          height={100}
          width={100}
          alt="avatar"
          className={style.avatar}
        />
        {showOptions && (
          <div className={style.containerTab}>
            <Options />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
