"use client";
import { HeaderSystem } from "@/components";
import style from "@/styles/layouts/_layoutSystem.module.scss";
export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={style.wrapper}>
      <HeaderSystem />
      <div className={style.block}></div>
      {children}
    </div>
  );
}
