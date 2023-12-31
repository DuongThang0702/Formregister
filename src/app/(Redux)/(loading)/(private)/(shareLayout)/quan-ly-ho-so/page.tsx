"use client";
import { FC, useState, useEffect, useRef } from "react";
import style from "@/styles/pages/_quan-ly-ho-so.module.scss";
import { fieldsTableQl } from "@/utils/contants";
import { User, Users } from "@/utils/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import * as xlsx from "xlsx";
import { Pagination } from "@/components";
import { useSearchParams } from "next/navigation";
const Page: FC = ({}) => {
  const params = useSearchParams();
  const [users, setUsers] = useState<Users | null>(null);
  const [Time, setTime] = useState<any>(null);

  const fetchUsers = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_USER}/admission`, {
        params: {
          day: Time ? new Date(Time) : new Date(),
          page: params.get("page"),
        },
      })
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
  }, [Time, params.get("page")]);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.center}>
          <h1 className={style.title}>Quản lý hồ sơ</h1>
        </div>
        <div className={style.selectDate}>
          <h1>Chọn ngày:</h1>
          <input
            type="date"
            onChange={(e) => setTime(e.target.value)}
            className={style.inputDate}
          />
        </div>
        <div className={style.container_bottom}>
          <div className={style.block}>
            <div
              className={style.button}
              onClick={() => downloadexcel(users?.users)}
            >
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
                  <td
                    className={style.td}
                    style={{
                      display: "flex",
                      columnGap: "1rem",
                    }}
                  >
                    {el.nganhHoc.map((el, index) => (
                      <li key={index}>{el},</li>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users?.counts && users.counts >= 10 && (
            <div className={style.pagination}>
              <div className={style.content}>
                <Pagination totalCounts={users.counts} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
