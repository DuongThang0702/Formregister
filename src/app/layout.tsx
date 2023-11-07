import type { Metadata } from "next";
import Head from "next/head";
import "@/styles/main.scss";
import "react-toastify/dist/ReactToastify.css";
export const metadata: Metadata = {
  title: "Quản lý tuyển sinh",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
