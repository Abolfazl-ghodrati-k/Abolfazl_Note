import React from "react";
import styles from "./Components.module.css";
import Image from "next/image";
import Router, { useRouter } from "next/router";

type Props = {
  icon: string;
  value: string;
  count: string;
  showSidebar: boolean;
  path: string;
};

function SideBarLink({ icon, value, count, showSidebar, path }: Props) {
  const router = useRouter();
  return (
    <div
      className={
        showSidebar
          ? styles.sidebar_link_container_opened
          : styles.sidebar_link_container_closed
      }
      onClick={() => {
        Router.push(path);
      }}
    >
      <div className={styles.sidebar_link_title}>
        <div style={{ marginTop: "8px", marginRight: "10px" }}>
          <Image src={icon} width={30} height={30} alt="person" />
        </div>
        <div
          style={{
            color: router.asPath == path ? "orangered" : "",
          }}
        >
          {value}
        </div>
      </div>
      <div className={styles.sidebar_link_count}>
        {count == "0" ? null : count}
      </div>
    </div>
  );
}

export default SideBarLink;
