import { FC, useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import Image from "next/image";
import { canvasPreview } from "@/utils/helper";

const Page: FC = ({}) => {
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const download = async () => {
    const response = await canvasPreview(
      imgRef.current,
      completedCrop,
      scale,
      rotation
    );
    console.log(response);
  };

  return (
    <div>
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        aspect={16 / 9}
        onComplete={(e) => {
          if (e?.height == 0 || e?.width == 0) {
            setCompletedCrop({
              x: 0,
              y: 0,
              height: parseInt(height),
              width: parseInt(width),
              unit: "px",
            });
          } else {
            setCompletedCrop(e);
          }
        }}
      >
        <Image
          src={`/logo.png`}
          height={1000}
          width={1000}
          alt=""
          ref={imgRef}
        />
      </ReactCrop>
      <div onClick={download}>Download</div>
    </div>
  );
};

export default Page;
