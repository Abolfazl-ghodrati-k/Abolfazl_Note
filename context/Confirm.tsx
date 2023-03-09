import React, { createContext, useState, useEffect } from "react";
import { BiTrendingUp } from "react-icons/bi";

export const ModalContext = createContext<contextType | null>(null);

interface contextType {
  onmodal: boolean;
  text: string;
  setonmodal: React.Dispatch<React.SetStateAction<boolean>>;
  settext: React.Dispatch<React.SetStateAction<string>>;
  halat: "yes" | "no" | "bitch";
  sethalat: React.Dispatch<React.SetStateAction<"yes" | "no" | "bitch">>;
  isYes: () => Promise<boolean>;
  setyes: React.Dispatch<React.SetStateAction<boolean>>;
  setno: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = {
  children: React.ReactNode;
};

const ModalContextWrapper = ({ children }: Props) => {
  const [onmodal, setonmodal] = useState(false);
  const [text, settext] = useState<string>("");
  const [halat, sethalat] = useState<"yes" | "no" | "bitch">("bitch");
  const [yes, setyes] = useState(false)
  const [no, setno] = useState(false)

  // Resolve from outside
  const isYes = () =>  new Promise<boolean>((resolve, reject) => {
    if(halat=='yes'){
        resolve(true)
    }else if(halat=='no'){
        resolve(false)
    }
  })

  return (
    <ModalContext.Provider
      value={{
        halat,
        sethalat,
        isYes,
        setyes,
        setno,
        text,
        settext,
        onmodal,
        setonmodal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextWrapper;
