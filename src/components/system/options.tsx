import { FC } from "react";
import style from "@/styles/components/system/_options.module.scss";
import { useRouter } from "next/navigation";
import { Routes } from "@/utils/path";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logout } from "@/redux/user";

const Page: FC = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className={style.wrapper}>
      <div className={style.containerOptions}>
        {user?.role === "1" && (
          <div
            className={style.option}
            onClick={() => router.push(`/${Routes.ADMIN}/${Routes.DASHBOARD}`)}
          >
            Dashboard
          </div>
        )}
        <div
          className={style.option}
          onClick={() => {
            router.push(`${Routes.HOME_PAGE}`);
            dispatch(logout());
          }}
        >
          Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default Page;
