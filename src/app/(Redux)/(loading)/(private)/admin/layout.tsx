"use client";

import { HeaderAdmin, SiderbarAdmin } from "@/components";
import { RootState } from "@/redux/store";
import style from "@/styles/layouts/_layoutAdmin.module.scss";
import { Routes } from "@/utils/path";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!user) router.push(`/`);
    if (user.role !== process.env.NEXT_PUBLIC_ADMIN)
      router.push(`/${Routes.SYSTEM}`);
  }, []);
  return (
    <div className={style.wrapper}>
      <SiderbarAdmin />
      <div className={style.block}></div>
      <div className={style.container}>
        <div className={style.header}>
          <HeaderAdmin />
        </div>
        <div className={style.blockHeader}></div>
        <div className={style.p5}>{children}</div>
      </div>
    </div>
  );
}
