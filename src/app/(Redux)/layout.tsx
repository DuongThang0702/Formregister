"use client";
import Providers from "@/redux/provider";

export default function ReduxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
