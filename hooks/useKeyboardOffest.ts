import { useState, useLayoutEffect, useEffect } from "react";
import { useCurrentTime, getBrowser, getDeviceType } from "./utils";

const useKeyboardOffset = () => {
  const [keyBoardOffset, setKeyBoardOffset] = useState<number>(0);
  const [container, setcontainer] = useState<HTMLElement | null>(null)
  const [body, setbody] = useState<HTMLElement | null>(null)
  const [browser, setBrowser] = useState("")
  const [isMobile, setisMobile] = useState(false)
  useEffect(() => {
    setbody(() => document.body || document.createElement("body"))
    const browser = getBrowser();
    const isMobile = getDeviceType();
    setBrowser(browser)
    setisMobile(isMobile)
  },[])
  const childNodes = body?.childNodes || [];
 
  //see Safari note below
  const needsBackup =
    isMobile && browser === "Apple Safari" && keyBoardOffset < 0;
  //i dont want to run this function very often and overload frontends when its not needed
  const delay = needsBackup ? 250 : 250000;
  const seconds = useCurrentTime(delay);
  const backupCheck = needsBackup ? seconds : 0;

  //Safari on iOS creates the most virtual keyboard issues, it doesnt throw any event when the user closes the keyboard
  //with the return or go buttons. Current solution is simply to keep checking if its been closed any time its open.
  //Happy to hear better work arounds here.
  useEffect(() => {
    if (container?.id) {
      const bReq = container.getBoundingClientRect();
      if (keyBoardOffset < 0 && bReq.top !== keyBoardOffset) {
        setKeyBoardOffset(bReq.top);
      }
    }
  }, [backupCheck, container?.id, keyBoardOffset]);

  //the anchor is the crux of this project, we insert the sizeless div and track its position against the viewport
  const insertAnchor = () => {
    let meas = document.createElement("div");
    meas.id = `keyboardOffsetAnchor`;
    meas.style.width = "0px";
    meas.style.height = "0px";
    meas.style.position = "absolute";
    meas.style.left = "0px";
    meas.style.top = "0px";
    body?.insertBefore(meas, body.firstChild);
  };

  //insert the anchor whenever we dont have one but only on mobile (functionality is irrelavant on desktop browsers)
  useEffect(() => {
    if (!container?.id && isMobile) {
      insertAnchor();
    }
  }, [container?.id, isMobile]);

  //listen for various events that may indicate that the keyboard has opened again only on mobile
  useLayoutEffect(() => {
    const delayEvent = () => {
      setTimeout(() => handleEvent(), 100);
    };

    const handleEvent = () => {
      if (container?.id) {
        const bReq = container.getBoundingClientRect();
        if (bReq.top !== keyBoardOffset) {
          setKeyBoardOffset(bReq.top);
        }
      }
    };

    if (isMobile) {
      window.addEventListener("click", delayEvent);
      window.addEventListener("blur", delayEvent);
      window.addEventListener("focus", delayEvent);
      window.addEventListener("keyup", delayEvent);

      delayEvent();
    }
    return () => {
      if (isMobile) {
        window.removeEventListener("click", delayEvent);
        window.removeEventListener("blur", delayEvent);
        window.removeEventListener("focus", delayEvent);
        window.removeEventListener("keyup", delayEvent);
      }
    };
  }, [container?.id, isMobile, keyBoardOffset]);

  return {
    keyBoardOffset: keyBoardOffset,
  };
};

export { useKeyboardOffset };
