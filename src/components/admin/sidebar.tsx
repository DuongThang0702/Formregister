import { FC, Fragment, memo, useState } from "react";
import style from "@/styles/components/admin/_sidebbar.module.scss";
import Image from "next/image";
import { tabSidebarAdmin } from "@/utils/contants";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";
import Link from "next/link";

const Page: FC = ({}) => {
  const pathName = usePathname();
  const [isShowTabParents, setIsShowTabParents] = useState<Array<number>>([]);
  const handleShowTabParent = (tabId: number) => {
    if (isShowTabParents.some((el) => el === tabId))
      setIsShowTabParents((prev) => prev.filter((el) => el !== tabId));
    else {
      setIsShowTabParents((prev) => [...prev, tabId]);
    }
  };
  return (
    <div className={style.wrapper}>
      <Image
        alt="logo"
        width={800}
        height={800}
        src={`/logo.png`}
        className={style.logo}
      />
      <div className={style.container}>
        <p className={style.sub}>Navigations</p>
        <div className={style.tabs}>
          {tabSidebarAdmin.map((el) =>
            el.type === "single" && el.path ? (
              <Link
                href={el.path}
                className={`${style.tab} ${
                  el.path === pathName && style.active
                }`}
                key={el.id}
              >
                <FontAwesomeIcon icon={el.icon} className={style.icon} />
                <h1 className={style.text}>{el.title}</h1>
              </Link>
            ) : el.type === "parent" && el.child ? (
              <Fragment key={el.id}>
                <div
                  className={`${style.tab} ${
                    isShowTabParents.some((tab) => tab === el.id) &&
                    style.active
                  }`}
                  onClick={() => handleShowTabParent(el.id)}
                >
                  <FontAwesomeIcon icon={el.icon} className={style.icon} />
                  <h1 className={style.text}>{el.title}</h1>
                  <FontAwesomeIcon
                    icon={icon.faChevronRight}
                    className={`${
                      isShowTabParents.some((tab) => tab === el.id) &&
                      style.iconArrow
                    }`}
                  />
                </div>
                {isShowTabParents.some((tab) => tab === el.id) && (
                  <div className={style.child}>
                    {el.child.map((el) => (
                      <Link href={el.path} key={el.id} className={style.tab}>
                        <FontAwesomeIcon
                          icon={el.icon}
                          className={style.icon}
                        />
                        <h1 className={style.text}>{el.title}</h1>
                      </Link>
                    ))}
                  </div>
                )}
              </Fragment>
            ) : (
              <Fragment key={el.id}></Fragment>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Page);
