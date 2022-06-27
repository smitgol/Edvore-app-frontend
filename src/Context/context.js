import { createContext, useState } from "react";


const Token = createContext()

export {Token}
const TokenContext = ({children}) => {
    const [token, setToken] = useState("")
    return <Token.Provider value={{token, setToken}}>
        {children}
    </Token.Provider>
}

export {TokenContext}