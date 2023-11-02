import { FC } from "react";
import style from "@/styles/pages/_quan-ly-ho-so.module.scss";

const Page: FC = ({}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>Quản lý hồ sơ</h1>

        <div className={style.table}>
          <div className={style.block}>
            <div className={style.button}>Export to Excel</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
