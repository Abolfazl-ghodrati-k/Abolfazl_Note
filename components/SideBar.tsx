import React from "react";
import styles from "./Components.module.css";
import SideBarLink from "./SideBarLink";
import Image from "next/image";

type Props = {
  showSidebar: boolean;
};

function SideBar({ showSidebar }: Props) {
  return (
    <div
      className={
        showSidebar
          ? styles.sidebar_container_closed
          : styles.sidebar_container_opened
      }
    >
      <div className={styles.sidebar_wrapper}>
        <div className={styles.sidebar_profile}>
          <Image src="/Images/Icons/person.png" width={30} height={30} alt="person"/>
        </div>
        <SideBarLink path="/home" showSidebar={showSidebar} value="All notes" icon="/Images/Icons/notes.png" count="11" />
        <SideBarLink path="/recycle" showSidebar={showSidebar} value="Recycle bin" icon="/Images/Icons/recycle.png" count="0" />
      </div>
    </div>
  );
}

export default SideBar;
