import {
    ReactNode, 
    useContext, 
    useState, 
    createContext
} from "react";
const AuthContext = createContext({} as AuthContextDataProps)

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    name: string;
    permission: number;
}

interface AuthContextDataProps {
    user: User;
    signIn: (user: string, password: string) => void;
}


function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({name: 'admin'} as User)

    function signIn(user: string, password: string) {
        if(user.trim().toLowerCase() === 'admin' && password.trim() === '12345') {
            console.log('chegou')
            setUser({ name: 'admin', permission: 1 });
            console.log('foi')
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            signIn
        }}>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }