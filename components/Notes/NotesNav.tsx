import Image from "next/image";
import Router from "next/router";
import React from "react";
import { Note } from "../../pages/_types";

type Props = {
  ShowMenu: boolean;
  title: string;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setonDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setonFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  styles: { readonly [key: string]: string };
  onDelete: boolean;
  onFavorite: boolean;
  showSidebar: boolean;
  setshowSidebarCopy: React.Dispatch<React.SetStateAction<boolean>>;
  setshowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNotes: Note[];
  setselectedNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

function NotesNav({
  setShowMenu,
  setselectedNotes,
  setonDelete,
  setonFavorite,
  ShowMenu,
  styles,
  onDelete,
  onFavorite,
  showSidebar,
  setshowSidebarCopy,
  setshowSidebar,
  title,
  selectedNotes,
}: Props) {
  function show() {
    if (ShowMenu) {
      return styles.opened_menu;
    } else {
      return styles.menu;
    }
  }
  return (
    <div
      className={styles.note_navbar}
      onClick={() => {
        if (ShowMenu) {
          setShowMenu(false);
        }
      }}
    >
      <div className={styles.main_nav}>
        {/* Search Handling --------------------------------------------------------------------------------- */}
        <div
          className={styles.search_icon}
          onClick={() => {
            Router.push({
              pathname:"/search",
              query:{redirect: Router.asPath}
            });
            setShowMenu(false);
            setonDelete(false);
            setonFavorite(false);
          }}
        >
          <Image
            src={"/Images/Icons/search.svg"}
            width={20}
            height={20}
            alt="search"
          />
        </div>
        {/* Mini Menu --------------------------------------------------------------------------------------- */}
        <div
          className={styles.search_icon}
          onClick={() => {
            setShowMenu(!ShowMenu);
          }}
        >
          <Image
            src={"/Images/Icons/menu-vertical.png"}
            width={20}
            height={20}
            alt="search"
          />
          <div className={show()} onClick={() => setShowMenu(false)}>
            <ul>
              <li>Share</li>
              {title == "Recycle bin" ? (
                <li
                  onClick={() => {
                    setonDelete(true);
                    setonFavorite(false);
                  }}
                >
                  Restore
                </li>
              ) : (
                <li
                  onClick={() => {
                    setonDelete(true);
                    setonFavorite(false);
                  }}
                >
                  Delete
                </li>
              )}
              <li
                onClick={() => {
                  setonDelete(false);
                  setonFavorite(true);
                }}
              >
                Add to Favorites
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Show side bar action handling --------------------------------------------------------------------- */}
      {onDelete || onFavorite ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "25px",
          }}
        >
          <div>
            {selectedNotes?.length
              ? selectedNotes?.length + " selected notes"
              : "0 selected notes"}
          </div>
          <div
            onClick={() => {
              setonDelete(false);
              setonFavorite(false);
              setselectedNotes([])
            }}
            style={{
              cursor: "pointer",
              background: "gray",
              color: "white",
              fontSize: "1.2rem",
              padding: "4px 8px",
              borderRadius: "10px",
            }}
          >
            cancel
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            if (showSidebar) {
              setshowSidebarCopy(false);
              setTimeout(() => {
                setshowSidebar(false);
              }, 300);
            } else {
              setshowSidebarCopy(true);
              setshowSidebar(true);
            }
            setShowMenu(false);
          }}
          style={{ cursor: "pointer", marginLeft: "8px" }}
        >
          <Image
            src={"/Images/Icons/menu-rounded.png"}
            width={20}
            height={20}
            alt="search"
          />
        </div>
      )}
    </div>
  );
}

export default NotesNav;
