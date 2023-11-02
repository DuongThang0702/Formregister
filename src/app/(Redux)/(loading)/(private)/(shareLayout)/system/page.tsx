import { FC } from "react";
import style from "@/styles/pages/_systempage.module.scss";
import Image from "next/image";
import { tabSystem } from "@/utils/contants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
const Page: FC = ({}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.top}>
        <div className={style.logo}>
          <Image src={"/logo.png"} width={1000} height={1000} alt="logo" />
        </div>
        <h1 className={style.title}>Hệ Thống Quản Lý Tuyển Sinh</h1>
      </div>
      <div className={style.containerTabs}>
        {tabSystem.map((el) => (
          <Link href={el.path} key={el.id} className={style.tab}>
            <div className={style.icon}>
              <FontAwesomeIcon icon={el.icon} />
            </div>
            <h1>{el.title}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
