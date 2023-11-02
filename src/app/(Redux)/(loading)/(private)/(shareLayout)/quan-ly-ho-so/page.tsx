import { FC } from "react";
import style from "@/styles/pages/_quan-ly-ho-so.module.scss";
import { fieldsTableQl } from "@/utils/contants";

const Page: FC = ({}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>Quản lý hồ sơ</h1>
        <div className={style.container_bottom}>
          <div className={style.block}>
            <div className={style.button}>Export to Excel</div>
          </div>
          <div className={style.table}>
            <div className={style.thead}>
              <div className={style.tr}>
                {fieldsTableQl.map((el) => (
                  <div key={el.id} className={style.th}>
                    {el.title}
                  </div>
                ))}
              </div>
            </div>
            <div className={style.tbody}>
              <div className={style.tr}>
                {fieldsTableQl.map((el) => (
                  <div key={el.id} className={style.th}>
                    {el.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
