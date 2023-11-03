"use client";
import { FC, useState, useRef } from "react";
import Demo from "./test";

const Page: FC = ({}) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
        }}
      >
        <Demo />
      </div>
    </div>
  );
};

export default Page;
