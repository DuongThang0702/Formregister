"use client";
import { FC, useState, useEffect } from "react";
import style from "@/styles/pages/_quan-ly-ho-so.module.scss";
import { fieldsTableQl } from "@/utils/contants";
import { User, Users } from "@/utils/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import * as xlsx from "xlsx";

const Page: FC = ({}) => {
  const [users, setUsers] = useState<Users | null>(null);

  const fetchUsers = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_USER}/user`)
      .then((rs: AxiosResponse) => {
        if (rs.status >= 400 && rs.status <= 599) return null;
        else setUsers(rs.data);
      })
      .catch((err: AxiosError) => console.log(err));
  };

  const downloadexcel = (data: any) => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "sheet1");
    xlsx.writeFile(workbook, "datasheet.xlsx");
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>Quản lý hồ sơ</h1>
        <div className={style.container_bottom}>
          <div className={style.block}>
            <div className={style.button} onClick={() => downloadexcel(users)}>
              Export to Excel
            </div>
          </div>
          <table className={style.table}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                {fieldsTableQl.map((el) => (
                  <th key={el.id} className={`${style.th}`}>
                    {el.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={style.tbody}>
              {users?.users.map((el) => (
                <tr className={style.tr} key={el._id}>
                  <td className={style.td}>{el._id}</td>
                  <td className={style.td}>{el.hoTen}</td>
                  <td className={style.td}>{el.sdt}</td>
                  <td className={style.td}>{el.heDaoTao}</td>
                  <td className={style.td}>{el.nganhHoc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
