import React, { useEffect, useState } from "react";
import styles from "./Components.module.css";
import SideBarLink from "./SideBarLink";
import Image from "next/image";
import { Note, User } from "../pages/_types";
import Router from "next/router";
import { FcSynchronize } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { userService } from "../services/user-service";
import { toast } from "react-toastify";

type Props = {
  showSidebar: boolean;
  setNotes: React.Dispatch<React.SetStateAction<Note[] | undefined>>;
};

function SideBar({ showSidebar, setNotes }: Props) {
  const [storedNotesCount, setstoredNotesCount] = useState("");
  const [deletedNotesCount, setdeletedNotesCount] = useState("");
  const [User, setUser] = useState<User>();

  useEffect(() => {
    const Notes = JSON.parse(localStorage.getItem("NOTES")!);
    const deletedNotes = JSON.parse(localStorage.getItem("DELETED_NOTES")!);
    const user = JSON.parse(localStorage.getItem("user")!);
    setstoredNotesCount(Notes?.length);
    setdeletedNotesCount(deletedNotes?.length);
    setUser(user as User);
  }, []);

  async function syncData() {
    const Notes = JSON.parse(localStorage.getItem("NOTES")!);
    const deletedNotes = JSON.parse(localStorage.getItem("DELETED_NOTES")!);
    const res = await fetchWrapper.post(process.env.apiUrl + "/sync", {
      Notes,
      deletedNotes,
      username: userService.userValue.username,
    });
    if (res?.saved) {
      toast.success("your notes updated successfully");
      const updatedNotes = res.DataStorage.Notes;
      const updatedDeletedNotes = res.DataStorage.deletedNotes;
      setstoredNotesCount(updatedNotes.length);
      setdeletedNotesCount(updatedDeletedNotes.length);
      const route = Router.asPath;
      switch (route) {
        case "/recycle":
          setNotes(updatedDeletedNotes);
          break;
        case "/home":
          setNotes(updatedNotes);
          break;
        default:
          break;
      }
      localStorage.setItem("NOTES", JSON.stringify(updatedNotes));
      localStorage.setItem(
        "DELETED_NOTES",
        JSON.stringify(updatedDeletedNotes)
      );
    } else {
      toast.error(
        "updating failed! try again later; if the error remains contact developer O.O"
      );
    }
  }

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
          <h2>{User?.username}</h2>
          <div>
            <Image
              src="/Images/Icons/person.png"
              width={30}
              height={30}
              alt="person"
            />
          </div>
        </div>
        <SideBarLink
          path="/home"
          showSidebar={showSidebar}
          value="All notes"
          icon="/Images/Icons/notes.png"
          count={storedNotesCount}
        />
        <SideBarLink
          path="/recycle"
          showSidebar={showSidebar}
          value="Recycle bin"
          icon="/Images/Icons/recycle.png"
          count={deletedNotesCount}
        />
        <hr />
        {User?.guest ? (
          <div className={styles.control_pannel}>
            <CgProfile size={25} color="white" />
            <Link href={"/"} style={{ color: "white" }}>
              Create Account for Free or SignIn
            </Link>
          </div>
        ) : (
          <div>
            <button
              className={`${styles.control_pannel} ${styles.functions}`}
              onClick={() => {
                if(!navigator.onLine){
                  toast.info("your offline, check internet connection and try again!")
                } else {
                  syncData()
                }
              }}
            >
              <FcSynchronize size={25} color="white" />
              <div>Sync Notes</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
