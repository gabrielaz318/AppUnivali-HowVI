import {
    ReactNode, 
    useContext, 
    useState, 
    createContext
} from "react";
import { Alert } from "react-native";
import Teacher from "../database/Teacher";
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
    signIn: (user: string, password: string, student: boolean) => Promise<void>;
    signOut: () => void;
}


function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)

    // Método para realizar login
    async function signIn(user: string, password: string, student: boolean) {
        if(student) {
            throw new Error();
            return
        }

        if(user.trim().toLowerCase() === 'admin' && password.trim() === '12345') {
            setUser({ name: 'admin', permission: 1 });
            return
        }

        try {
            const responseTeacher = await Teacher.findLogin({ usuario: user, senha: password });
            setUser({ name: responseTeacher.nome, permission: 2 });
        } catch (error) {
            throw new Error();
            return
        }
    }

    // Método para sair do app
    function signOut() {
        Alert.alert('Você quer mesmo sair do app?','',
        [
            {
                text: 'Cancelar'
            },
            {
                text: 'Sair',
                onPress: () => setUser(null)
            },
        ]);
    }

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut
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