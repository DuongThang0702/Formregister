import { FC, memo } from "react";
import style from "@/styles/components/admin/_header.module.scss";
const Page: FC = ({}) => {
  return (
    <div className={style.container}>
      <h1>header</h1>
    </div>
  );
};

export default memo(Page);
