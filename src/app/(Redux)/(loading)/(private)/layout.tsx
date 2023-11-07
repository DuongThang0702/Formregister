"use client";
import { RootState } from "@/redux/store";
import { Routes } from "@/utils/path";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn || !user) {
      toast.error("Login required");
      router.push(`${Routes.HOME_PAGE}`);
    }
  }, [isLoggedIn, user]);
  return <>{children}</>;
}
