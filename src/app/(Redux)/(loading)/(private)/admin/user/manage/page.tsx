"use client";
import { FC, useEffect, useState } from "react";
import style from "@/styles/pages/_manage-user.module.scss";
import axios, { AxiosResponse } from "axios";
import { fieldsAdminUser } from "@/utils/contants";
import { Users } from "@/utils/types";

const Page: FC = ({}) => {
  const [users, setUsers] = useState<Users | null>(null);
  const fetchAllUser = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_USER}/user`)
      .then((rs: AxiosResponse) => {
        if (rs.status >= 400 && rs.status <= 599) return null;
        else setUsers(rs.data);
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
                <th
                  key={el.id}
                  className={`${el.center ? style.text_center : ""}`}
                >
                  {el.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users?.users.map((el) => (
              <tr key={el._id}>
                <td>{el._id}</td>
                <td>{el.email}</td>
                <td>{el.hoTen}</td>
                <td>
                  {el.role === process.env.NEXT_PUBLIC_ADMIN ? "Admin" : "User"}
                </td>
                <td>{el.sdt}</td>
                <td className={style.action}>
                  <div className={style.update}>Update</div>
                  <div className={style.delete}>Delete</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
