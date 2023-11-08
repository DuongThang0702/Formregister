import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FC } from "react";
import style from "@/styles/components/preview/_slider.module.scss";

interface Props {
  label?: string;
  value: number;
  min: number;
  max: number;
  defaultValue: number;
  onChange(value: number): void;
}

const AppSlider: FC<Props> = ({
  label,
  value,
  defaultValue,
  max,
  min,
  onChange,
}) => {
  const handleChange = (value: number | number[]) => {
    onChange(value as number);
  };
  return (
    <div className={style.wrapper}>
      <p>{label}</p>
      <div style={{ padding: "0.5rem" }}>
        <Slider
          onChange={handleChange}
          min={min}
          max={max}
          defaultValue={defaultValue}
          value={value}
          step={0.01}
          trackStyle={{ backgroundColor: "#B8DFF3", height: 10 }}
          railStyle={{ backgroundColor: "rgb(243 244 246)", height: 10 }}
          handleStyle={{
            height: 20,
            width: 20,
            backgroundColor: "white",
            borderColor: "#B8DFF3",
          }}
        />
      </div>
    </div>
  );
};

export default AppSlider;
