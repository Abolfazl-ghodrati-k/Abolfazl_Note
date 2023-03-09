import React, { useCallback, useEffect, useState } from "react";
import styles from "./Components.module.css";
import SideBarLink from "./SideBarLink";
import Image from "next/image";
import { Note, User } from "../pages/_types";
import Router from "next/router";
import { FcSynchronize } from "react-icons/fc";
import { MdSystemUpdateAlt } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { userService } from "../services/user-service";
import { toast } from "react-toastify";
import { recieveNotes } from "../pages";
import useLoading from "../hooks/useLoading";
import useModal from "../hooks/useModal";

type Props = {
  showSidebar: boolean;
  setNotes: React.Dispatch<React.SetStateAction<Note[] | undefined>>;
};

function SideBar({ showSidebar, setNotes }: Props) {
  const [storedNotesCount, setstoredNotesCount] = useState("");
  const [deletedNotesCount, setdeletedNotesCount] = useState("");
  const [User, setUser] = useState<User>();
  const { startLoading, finishLoading } = useLoading();
  const { openmodal, isYes, sethalat, halat } = useModal();

  useEffect(() => {
    setTimeout(() => {
      sethalat("bitch");
    }, 3000);
  });

  useEffect(() => {
    (async () => {
      const doit = await isYes();
      if (doit) {
        await syncData();
      } else if (!doit) {
        console.log("dont do it");
      }
    })();
  }, [halat]);

  useEffect(() => {
    const Notes = JSON.parse(localStorage.getItem("NOTES")!);
    const deletedNotes = JSON.parse(localStorage.getItem("DELETED_NOTES")!);
    const user = JSON.parse(localStorage.getItem("user")!);
    setstoredNotesCount(Notes?.length);
    setdeletedNotesCount(deletedNotes?.length);
    setUser(user as User);
  }, []);

  const syncData = async () => {
    startLoading("syncing data...");
    const Notes = JSON.parse(localStorage.getItem("NOTES")!);
    const deletedNotes = JSON.parse(localStorage.getItem("DELETED_NOTES")!);
    const res = await fetchWrapper.post("/api/sync", {
      Notes,
      deletedNotes,
      username: userService.userValue.username,
    });
    finishLoading();
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
  };

  async function decideTodo() {
    openmodal(
      "Sure to owerrite notes in database?" +
        "\n" +
        "you can update notes first..."
    );
    return;
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
          <>
            <div>
              <button
                className={`${styles.control_pannel} ${styles.functions}`}
                onClick={() => {
                  if (!navigator.onLine) {
                    toast.info(
                      "your offline, check internet connection and try again!"
                    );
                  } else {
                    decideTodo();
                  }
                }}
              >
                <FcSynchronize size={25} color="white" />
                <div>Sync Notes</div>
              </button>
            </div>
            <div>
              <button
                className={`${styles.control_pannel} ${styles.functions}`}
                onClick={async () => {
                  if (!navigator.onLine) {
                    toast.info(
                      "your offline, check internet connection and try again!"
                    );
                  } else {
                    startLoading("Recieving saved Notes ...");
                    const { savedNotes, deletedNotes } = await recieveNotes();
                    finishLoading();
                    if (
                      savedNotes?.length == 0 ||
                      (savedNotes?.length > 0 &&
                        (deletedNotes?.length == 0 || deletedNotes?.length > 0))
                    ) {
                      const Notes =
                        JSON.parse(localStorage.getItem("NOTES")!) ?? [];
                      const DeletedNotes =
                        JSON.parse(localStorage.getItem("DELETED_NOTES")!) ??
                        [];
                      console.log(savedNotes);
                      savedNotes?.forEach((element: Note, index: number) => {
                        const exists = Notes?.some(
                          (n: any) => n?.id == element?.id
                        );
                        if (!exists) {
                          Notes?.push(savedNotes[index]);
                        }
                      });
                      deletedNotes?.forEach((element: Note, index: number) => {
                        const exists = DeletedNotes.some(
                          (n: any) => n?.id == element?.id
                        );
                        if (!exists) {
                          Notes?.push(savedNotes[index]);
                        }
                      });
                      setstoredNotesCount(Notes?.length);
                      setdeletedNotesCount(DeletedNotes?.length);
                      const route = Router.asPath;
                      switch (route) {
                        case "/recycle":
                          setNotes(DeletedNotes);
                          break;
                        case "/home":
                          setNotes(Notes);
                          break;
                        default:
                          break;
                      }
                      localStorage.setItem("NOTES", JSON.stringify(Notes));
                      localStorage.setItem(
                        "DELETED_NOTES",
                        JSON.stringify(DeletedNotes)
                      );
                      toast.dark("notes updated successfully");
                    } else {return}
                  }
                }}
              >
                <MdSystemUpdateAlt size={25} color="orangered" />
                <div>recieve Notes</div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SideBar;
