import { CSSProperties, FC, memo } from "react";
import { ClipLoader, GridLoader } from "react-spinners";
import style from "@/styles/components/_loading.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Page: FC = ({}) => {
  const { isShowModel } = useSelector((state: RootState) => state.app);

  return (
    <GridLoader
      color="#36d7b7"
      loading={isShowModel}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
      className={style.loading}
    />
  );
};

export default memo(Page);
