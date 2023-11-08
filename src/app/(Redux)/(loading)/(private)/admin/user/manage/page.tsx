"use client";
import { FC, useEffect, useState } from "react";
import style from "@/styles/pages/_manage-user.module.scss";
import axios, { AxiosError, AxiosResponse } from "axios";
import { fieldsAdminUser } from "@/utils/contants";
import { User, Users } from "@/utils/types";
import { useForm } from "react-hook-form";
import { InputForm, SelectForm } from "@/components";
import { apiUpdateUser } from "@/api/user";
import { toast } from "react-toastify";

const Page: FC = ({}) => {
  const [edit, setEdit] = useState<User | null>(null);
  const [users, setUsers] = useState<Users | null>(null);
  const [update, setUpdate] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<User>();
  const render = () => setUpdate((prev) => !prev);
  const fetchAllUser = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_USER}/user`)
      .then((rs: AxiosResponse) => {
        if (rs.status >= 400 && rs.status <= 599) return null;
        else setUsers(rs.data);
      })
      .catch((err) => console.log(err));
  };
  const handleUpdateUserByAdmin = async (data: User) => {
    await apiUpdateUser(edit?._id!, data)
      .then((rs: AxiosResponse) => {
        if (rs.status >= 400 && rs.status <= 599)
          toast.error("Something went wrong");
        if (rs.status >= 200 && rs.status <= 399) {
          toast.success("updated successfully");
          render();
        }
      })

      .catch((err: AxiosError) => toast.error("Something went wrong!"));
  };

  useEffect(() => {
    fetchAllUser();
  }, [update]);

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit(handleUpdateUserByAdmin)}>
        <div className={style.top}>
          <div className={style.block}>
            <h1>manage user</h1>
            {edit && (
              <button
                type="submit"
                disabled={!isDirty || !isValid}
                className={style.submitUpdate}
              >
                Update
              </button>
            )}
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
                  <td style={{ width: "20%" }}>
                    {edit?._id === el._id ? (
                      <InputForm
                        defaultValue={edit.hoTen}
                        register={register}
                        validate={{ required: "require fill" }}
                        id="email"
                      />
                    ) : (
                      el.hoTen
                    )}
                  </td>
                  <td>
                    {edit?._id === el._id ? (
                      <SelectForm
                        errors={errors?.role?.message}
                        id="role"
                        register={register}
                        defaultValue={edit?.role}
                        fullw
                        validate={{ required: "require fill" }}
                        options={[
                          { value: "1", text: "admin" },
                          { value: "2", text: "user" },
                        ]}
                      />
                    ) : el.role === process.env.NEXT_PUBLIC_ADMIN ? (
                      "Admin"
                    ) : (
                      "User"
                    )}
                  </td>
                  <td>
                    {edit?._id === el._id ? (
                      <InputForm
                        defaultValue={edit.sdt}
                        validate={{ required: "require fill" }}
                        register={register}
                        id="sdt"
                      />
                    ) : (
                      el.sdt
                    )}
                  </td>
                  <td>
                    {edit === null ? (
                      <div className={style.action}>
                        <div
                          className={style.update}
                          onClick={() => setEdit(el)}
                        >
                          Update
                        </div>
                        <div className={style.delete}>Delete</div>
                      </div>
                    ) : (
                      <div className={style.action}>
                        <div
                          className={style.delete}
                          onClick={() => setEdit(null)}
                        >
                          Cancel
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default Page;
