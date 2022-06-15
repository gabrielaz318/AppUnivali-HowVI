import {
    ReactNode, 
    useContext, 
    useState, 
    createContext
} from "react";
const DatabaseContext = createContext({} as DatabaseContextDataProps)

interface DatabaseProviderProps {
    children: ReactNode;
}


interface DatabaseContextDataProps {
}


function DatabaseProvider({ children }: DatabaseProviderProps) {

    return (
        <DatabaseContext.Provider value={{
        }}>
            { children }
        </DatabaseContext.Provider>
    )
}

function useDatabase() {
    const context = useContext(DatabaseContext)

    return context
}

export { DatabaseProvider, useDatabase }