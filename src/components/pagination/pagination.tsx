import usePagination from "@/hooks/usePagination";
import icon from "@/utils/icon";
import style from "@/styles/components/pagination/_pagination.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback } from "react";
import PagiItem from "./pagiItem";
interface Props {
  totalCounts: number;
}

const Page: FC<Props> = ({ totalCounts }) => {
  const router = useRouter();
  const query = useSearchParams();
  const pathname: string = usePathname();
  const currentPage: number = parseInt(query.get("page") as string);
  const pagination = usePagination(totalCounts, currentPage);
  const totalPage: number = Math.ceil(
    totalCounts / parseInt(process.env.NEXT_PUBLIC_LIMIT as string)
  );
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(query.toString());
      params.set(name, value);
      return params.toString();
    },
    [query]
  );

  return (
    <div className={style.container}>
      {currentPage - 1 >= 1 ? (
        <div
          className={style.arrow}
          onClick={() => {
            router.push(
              pathname +
                "?" +
                createQueryString("page", (currentPage - 1).toString())
            );
          }}
        >
          Previos
        </div>
      ) : (
        <></>
      )}
      {pagination?.map((el, index) => (
        <PagiItem key={index}>{el}</PagiItem>
      ))}
      {currentPage + 1 <= totalPage ? (
        <div
          className={style.arrow}
          onClick={() => {
            router.push(
              pathname +
                "?" +
                createQueryString("page", (currentPage + 1).toString())
            );
          }}
        >
          Next
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Page;
