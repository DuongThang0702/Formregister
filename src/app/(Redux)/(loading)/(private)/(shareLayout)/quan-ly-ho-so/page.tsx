"use client";
import { FC, useState, useEffect } from "react";
import style from "@/styles/pages/_quan-ly-ho-so.module.scss";
import { fieldsTableQl } from "@/utils/contants";
import { User } from "@/utils/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import * as xlsx from "xlsx";

const Page: FC = ({}) => {
  const [users, setUsers] = useState<User[] | null>(null);

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
          <div className={style.table}>
            <div className={style.thead}>
              <div className={style.tr}>
                {fieldsTableQl.map((el) => (
                  <div key={el.id} className={style.th}>
                    {el.title}
                  </div>
                ))}
              </div>
            </div>
            <div className={style.tbody}>
              {users?.map((el) => (
                <div className={style.tr} key={el._id}>
                  <div className={style.td}>{el._id}</div>
                  <div className={style.td}>{el.hoTen}</div>
                  <div className={style.td}>{el.soDienThoai}</div>
                  <div className={style.td}>{el.heDaoTao}</div>
                  <div className={style.td}>{el.nganhHoc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
