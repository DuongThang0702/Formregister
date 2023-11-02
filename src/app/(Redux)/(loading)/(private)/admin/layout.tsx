"use client";

import { HeaderAdmin, SiderbarAdmin } from "@/components";
import style from "@/styles/layouts/_layoutAdmin.module.scss";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
