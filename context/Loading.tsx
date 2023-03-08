import React, { createContext, useState } from "react";

export const LoadingContext = createContext<contextType | null>(null)

interface contextType {
    loading: boolean,
    text: string,
    settext: React.Dispatch<React.SetStateAction<string>>
    setloading: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = {
    children: React.ReactNode
}

const ContextWrapper = ({children}: Props) => {
    const [loading, setloading] = useState(false)
    const [text, settext] = useState("")

    return(
        <LoadingContext.Provider value={{text, settext,loading, setloading}}>
           {children}
        </LoadingContext.Provider>
    )
}

export default ContextWrapper