import { FC } from "react";
import style from "@/styles/components/system/_options.module.scss";
import { useRouter } from "next/navigation";
import { Routes } from "@/utils/path";

const Page: FC = ({}) => {
  const router = useRouter();

  return (
    <div className={style.wrapper}>
      <div className={style.containerOptions}>
        <div
          className={style.option}
          onClick={() => router.push(`/${Routes.ADMIN}/${Routes.DASHBOARD}`)}
        >
          Dashboard
        </div>
        <div className={style.option}>Đăng xuất</div>
      </div>
    </div>
  );
};

export default Page;
