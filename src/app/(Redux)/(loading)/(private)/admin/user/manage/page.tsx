"use client";
import { FC, useEffect } from "react";
import style from "@/styles/pages/_manage-user.module.scss";
import axios, { AxiosResponse } from "axios";
import { fieldsAdminUser } from "@/utils/contants";

const Page: FC = ({}) => {
  const fetchAllUser = async () => {
    await axios
      .get("https://api-mogodb.onrender.com/get_ListAdmission2/")
      .then((rs: AxiosResponse) => {
        console.log(rs.data[0]);
        console.log(JSON.parse(rs.data[0]));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllUser();
  }, []);
  return (
    <div className={style.wrapper}>
      <div className={style.top}>
        <div className={style.title}>
          <h1>manage user</h1>
        </div>
      </div>
      <div className={style.container}>
        <table className={style.table}>
          <thead>
            <tr>
              {fieldsAdminUser.map((el) => (
                <th key={el.id}>{el.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
              <td>1961</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
