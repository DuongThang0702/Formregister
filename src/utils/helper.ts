// export const dataUrlToFile = (dataUrl: string): File | undefined => {
//   const arr = dataUrl.split(",");
//   if (arr.length < 2) {
//     return undefined;
//   }
//   const mimeArr = arr[0].match(/:(.*?);/);

//   if (!mimeArr || mimeArr.length < 2) {
//     return undefined;
//   }
//   const mime = mimeArr[1];
//   const buff = Buffer.from(arr[1], "base64");
//   return new File([buff], "image", { type: mime });
// };

// function dataURLtoFile(dataurl: string) {
//   const arr = dataurl.split(","),
//     mime = arr[0].match(/:(.*?);/),
//     bstr = atob(arr[arr.length - 1]),
//     n = bstr.length,
//     u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], "image", { type: mime });
// }

export async function dataUrlToFile(dataUrl: string): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], "image", { type: "image/jpeg" });
}
