"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import style from "@/styles/layouts/_layoutModal.module.scss";

export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isShowModel, modelChildren } = useSelector(
    (state: RootState) => state.app
  );
  return (
    <div className={style.wrapper}>
      {isShowModel && (
        <div className={style.containerWrapperModal}>{modelChildren}</div>
      )}
      {children}
    </div>
  );
}
