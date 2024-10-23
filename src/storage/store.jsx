import { createContext, useState } from "react";

export const authContext = createContext()


export function Store({children}) {

    const[state,setState]= useState(false)
    return(
        <authContext.Provider value={{state,setState}}>
            {children}
        </authContext.Provider>
    )
}