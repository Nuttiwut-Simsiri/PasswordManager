import { useState } from "react";
import { createContext } from "react";
export const PasswordContext = createContext();

export const PasswordContextProvider = ({ children }) => {
    const [genPassword, setGenPassword] = useState("")
    const value = {
        genPassword,
        setGenPassword
    };

    return (
        <PasswordContext.Provider value={value}>
            {children}
        </PasswordContext.Provider>
    )
}