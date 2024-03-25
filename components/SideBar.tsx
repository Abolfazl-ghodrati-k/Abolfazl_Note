import React, { useCallback, useEffect, useState } from "react";
import styles from "./Components.module.css";
import SideBarLink from "./SideBarLink";
import Image from "next/image";
import { Note, User } from "../pages/_types";
import Router, { useRouter } from "next/router";
import { FcSynchronize } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { MdSystemUpdateAlt } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { userService } from "../services/user-service";
import { toast } from "react-toastify";
import { recieveNotes } from "../pages";
import useLoading from "../hooks/useLoading";
import { useModal } from "./ModalsManager/useModal";
import { ConfirmModalOptions } from "../modals/ConfiramtionModal";

type Props = {
  showSidebar: boolean;
  setNotes: React.Dispatch<React.SetStateAction<Note[] | undefined>>;
};

type NoteResponseType = {
  notes: Note[];
  deletedNotes: Note[];
};

function SideBar({ showSidebar, setNotes }: Props) {
  const [storedNotesCount, setstoredNotesCount] = useState(0);
  const [deletedNotesCount, setdeletedNotesCount] = useState(0);
  const [user, setUser] = useState<User>();
  const { startLoading, finishLoading } = useLoading();
  const { addToModalsStack } = useModal<ConfirmModalOptions>();

  const syncData = async () => {
    startLoading("syncing data...");
    const notes = JSON.parse(localStorage.getItem("NOTES")!);
    const deletedNotes = JSON.parse(localStorage.getItem("DELETED_NOTES")!);
    const res = await fetchWrapper.post<NoteResponseType>("/api/sync", {
      notes,
      deletedNotes,
      username: userService.userValue?.username,
    });
    finishLoading();
    if (res && res.data) {
      toast(res.message);
      const updatedNotes = res.data.notes;
      const updatedDeletedNotes = res.data?.deletedNotes;
      setstoredNotesCount(updatedNotes?.length ?? 0);
      setdeletedNotesCount(updatedDeletedNotes?.length ?? 0);
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
        "Updating failed! try again later; if the error remains contact developer O.O"
      );
    }
  };

  const handleSyncNotes = async () => {
    if (!navigator.onLine) {
      toast.info("your offline, check internet connection and try again!");
    } else {
      addToModalsStack([
        {
          id: "confirm",
          options: {
            callBack: syncData,
            body: "Are You sure about syncing notes? \r\n you can fetch them first",
          },
        },
      ]);
    }
  };

  const router = useRouter();

  useEffect(() => {
    const Notes = JSON.parse(localStorage.getItem("NOTES")!);
    const deletedNotes = JSON.parse(localStorage.getItem("DELETED_NOTES")!);
    const user = JSON.parse(localStorage.getItem("user")!);
    setstoredNotesCount(Notes?.length);
    setdeletedNotesCount(deletedNotes?.length);
    setUser(user as User);
  }, []);

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
          <h2>{user?.username}</h2>
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
        {user?.guest ? (
          <>
            <div className={styles.control_pannel}>
              <CgProfile size={25} color="white" />
              <Link href={"/"} style={{ color: "white" }}>
                Create Account for Free or SignIn
              </Link>
            </div>
            <hr />
          </>
        ) : (
          <>
            <div>
              <button
                className={`${styles.control_pannel} ${styles.functions}`}
                onClick={handleSyncNotes}
              >
                <FcSynchronize size={25} color="white" />
                <div>Sync Notes</div>
              </button>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <button
                className={`${styles.control_pannel} ${styles.functions}`}
                onClick={async () => {
                  if (!navigator.onLine) {
                    toast.info(
                      "your offline, check internet connection and try again!"
                    );
                  }
                  // else {
                  //   startLoading("Recieving saved Notes ...");
                  //   const { savedNotes, deletedNotes } = await recieveNotes();
                  //   finishLoading();
                  //   if (
                  //     savedNotes?.length == 0 ||
                  //     (savedNotes?.length > 0 &&
                  //       (deletedNotes?.length == 0 || deletedNotes?.length > 0))
                  //   ) {
                  //     const Notes =
                  //       JSON.parse(localStorage.getItem("NOTES")!) ?? [];
                  //     const DeletedNotes =
                  //       JSON.parse(localStorage.getItem("DELETED_NOTES")!) ??
                  //       [];
                  //     console.log(savedNotes);
                  //     savedNotes?.forEach((element: Note, index: number) => {
                  //       const exists = Notes?.some(
                  //         (n: any) => n?.id == element?.id
                  //       );
                  //       if (!exists) {
                  //         Notes?.push(savedNotes[index]);
                  //       }
                  //     });
                  //     deletedNotes?.forEach((element: Note, index: number) => {
                  //       const exists = DeletedNotes.some(
                  //         (n: any) => n?.id == element?.id
                  //       );
                  //       if (!exists) {
                  //         Notes?.push(savedNotes[index]);
                  //       }
                  //     });
                  //     setstoredNotesCount(Notes?.length);
                  //     setdeletedNotesCount(DeletedNotes?.length);
                  //     const route = Router.asPath;
                  //     switch (route) {
                  //       case "/recycle":
                  //         setNotes(DeletedNotes);
                  //         break;
                  //       case "/home":
                  //         setNotes(Notes);
                  //         break;
                  //       default:
                  //         break;
                  //     }
                  //     localStorage.setItem("NOTES", JSON.stringify(Notes));
                  //     localStorage.setItem(
                  //       "DELETED_NOTES",
                  //       JSON.stringify(DeletedNotes)
                  //     );
                  //     toast.dark("notes updated successfully");
                  //   } else {
                  //     return;
                  //   }
                  // }
                }}
              >
                <MdSystemUpdateAlt size={25} color="orangered" />
                <div>recieve Notes</div>
              </button>
            </div>
            <hr />
          </>
        )}
        <button
          className={`${styles.control_pannel} ${styles.functions}`}
          onClick={() => {
            userService.logout();
            router.push("/");
          }}
        >
          <FiLogOut size={25} color={"white"} />
          <div>{userService?.userValue?.guest ? "Exit" : "Sign Out"}</div>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
