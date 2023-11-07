import React, { FC, memo } from "react";
import { UseFormRegister } from "react-hook-form";
import inputDefault from "@/styles/components/_inputForm.module.scss";

interface InputForm {
  value?: string;
  placeholder?: string;
  type?: string;
  fullW?: boolean;
  id: string;
  errors?: string;
  validate?: object;
  style?: string;
  defaultValue?: string | number | any;
  register: UseFormRegister<any>;
  content?: string;
}

const inputForm: FC<InputForm> = ({
  placeholder,
  type = "text",
  fullW,
  id,
  validate,
  defaultValue,
  errors,
  style,
  value,
  content,
  register,
}) => {
  return (
    <>
      {(type === "text" ||
        type === "password" ||
        type === "number" ||
        type === "date") && (
        <div
          className={`${fullW && inputDefault.fullW} ${inputDefault.container}`}
        >
          <input
            type={type}
            placeholder={placeholder}
            className={`${style ? style : inputDefault.input} `}
            id={id}
            {...register(id, validate)}
            defaultValue={defaultValue}
          />
          {errors && <span className={inputDefault.error}>{errors}</span>}
        </div>
      )}

      {type === "textarea" && (
        <textarea
          rows={5}
          cols={2}
          placeholder={placeholder}
          className={`${inputDefault.textarea} ${fullW && inputDefault.fullW}`}
          id={id}
          {...register(id, validate)}
          defaultValue={defaultValue}
        ></textarea>
      )}

      {type === "radio" && (
        <div
          className={`${fullW && inputDefault.fullW} ${
            inputDefault.containerRadio
          }`}
        >
          <input
            id={id}
            className={`${inputDefault.Radio}`}
            type="radio"
            {...register(id, validate)}
            value={value}
          ></input>
          <label htmlFor={id}>{content}</label>
          {errors && <span className={inputDefault.error}>{errors}</span>}
        </div>
      )}

      {type === "checkbox" && (
        <div
          className={`${fullW && inputDefault.fullW} ${
            inputDefault.containerRadio
          }`}
        >
          <input
            id={id}
            className={`${inputDefault.Radio}`}
            type="checkbox"
            {...register(id, validate)}
            value={value}
          ></input>
          <label htmlFor={id}>{content}</label>
          {errors && <span className={inputDefault.error}>{errors}</span>}
        </div>
      )}
    </>
  );
};

export default memo(inputForm);
