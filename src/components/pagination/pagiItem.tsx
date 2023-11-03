import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback } from "react";
import style from "@/styles/components/pagination/_pagiItem.module.scss";
interface Props {
  children: string | number;
}

const Page: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleOnClick = () => {
    router.push(
      pathname + "?" + createQueryString("page", children.toString())
    );
  };
  return (
    <button
      type="button"
      onClick={handleOnClick}
      className={
        Number(children)
          ? `${style.base} ${
              parseInt(searchParams.get("page") as string) === children
                ? style.active
                : ``
            }`
          : style.base
      }
      disabled={!Number(children)}
    >
      {children}
    </button>
  );
};

export default Page;
