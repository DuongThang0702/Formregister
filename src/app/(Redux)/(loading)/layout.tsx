"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import style from "@/styles/layouts/_layoutModal.module.scss";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
