import {
    ReactNode, 
    useContext, 
    useState, 
    createContext
} from "react";
import { Alert, InteractionManager } from "react-native";

import Class from "../database/Class";
import Teacher from "../database/Teacher";

import { CreateTeacherProps, UpdateTeacherProps, ReturnFindAllTeachers } from "../DTO/teacher";
import { ReturnClassById, ReturnFindAllClass } from "../DTO/class";

const DatabaseContext = createContext({} as DatabaseContextDataProps)

interface DatabaseProviderProps {
    children: ReactNode;
}

interface DatabaseContextDataProps {
    createTeacher: (data: CreateTeacherProps) => Promise<boolean>;
    updateTeacher: (data: UpdateTeacherProps) => Promise<boolean>;
    findAllTeachers: () => Promise<ReturnFindAllTeachers[]>;
    removeTeacher: (id: number) => Promise<void>;
    findTeacherById: (id: number) => Promise<UpdateTeacherProps>;

    createClass: (number: string) => Promise<boolean>;
    updateClass: (number: string, id: number) => Promise<boolean>;
    findAllClass: () => Promise<ReturnFindAllClass[]>;
    findClassById: (id: number) => Promise<ReturnClassById>;
    removeClass: (id: number) => Promise<void>;
}

function DatabaseProvider({ children }: DatabaseProviderProps) {

    // Função para criar um professor
    async function createTeacher(data: CreateTeacherProps) {
        try {
            const verifyTeacher = await Teacher.verifyUserName(data.user);
            if(!!verifyTeacher?.usuario) {
                Alert.alert('Atenção', 'Este nome de usuário já está sendo utilizado.');
                throw new Error('user_exist');
                return
            }
            await Teacher.create({ nome: data.name, usuario: data.user, senha: data.password, materia: data.subjects })
            return true
        } catch (error) {
            
        }
    }

    // função para atualizar um professor
    async function updateTeacher(data: UpdateTeacherProps) {
        try {
            const verifyTeacher = await Teacher.verifyUserName(data.user);
            if(!!verifyTeacher?.usuario && String(verifyTeacher.id ) !== String(data.id)) {
                Alert.alert('Atenção', 'Este nome de usuário já está sendo utilizado.');
                throw new Error('user_exist');
                return
            }
            await Teacher.update({ id: data.id ,nome: data.name, usuario: data.user, senha: data.password, materia: data.subjects })
            return true
        } catch (error) {
            console.log(error)
        }
    }

    // Função para listar todos os professores
    async function findAllTeachers() {
        try {
            const response = await Teacher.findAll();
            if(response instanceof Array) {
                const responseFormatted = response.map(item => {return{ name: item.nome, key: item.id }});
                return responseFormatted;
            } else {
                return [response].map(item => {return{ name: item.nome, key: item.id }});
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Função para procurar um professor pelo id
    async function findTeacherById(id: number) {
        try {
            const response = await Teacher.findById(id);
            return [response].map(item => {
                return {
                    id: item.id,
                    name: item.nome,
                    user: item.usuario,
                    password: item.senha,
                    subjects: item.materia
                }
            })[0]
        } catch (error) {
            console.log(error)
        }
    }

    // Função para remover um professor
    async function removeTeacher(id: number) {
        try {
            await Teacher.remove(id)
            return
        } catch (error) {
            console.log(error)
        }
    }   

    // Função para criar uma sala
    async function createClass(number: string) {
        try {
            const verifyClass = await Class.verifyClassExist(number);
            if(!!verifyClass?.numero) {
                Alert.alert('Atenção', 'Este número de sala já está sendo utilizado.');
                throw new Error('class_exist');
                return
            }
            await Class.create({numero: number});
            return true
        } catch (error) {
            
        }
    }

    // Função para atualizar o registro de uma sala
    async function updateClass(number: string, id: number) {
        try {
            const verifyClass = await Class.verifyClassExist(number);
            if(!!verifyClass?.numero && verifyClass.id != id) {
                Alert.alert('Atenção', 'Este número de sala já está sendo utilizado.');
                throw new Error('class_exist');
                return
            }
            await Class.update({numero: number, id});
            return true
        } catch (error) {
            console.log(error)
        }
    }

    // Função para listar todas as salas
    async function findAllClass() {
        try {
            const response = await Class.findAll();
            if(response instanceof Array) {
                const responseFormatted = response.map(item => {return{ name: item.numero, key: item.id }});
                return responseFormatted;
            } else {
                return [response].map(item => {return{ name: item.numero, key: item.id }});
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Função para procurar uma sala pelo seu id
    async function findClassById(id: number) {
        try {
            const response = await Class.findById(id);
            return [response].map(item => {return{ name: item.numero, key: item.id }})[0];
        } catch (error) {
            console.log(error)
        }
    }

    // Função para remover uma sala
    async function removeClass(id: number) {
        try {
            await Class.remove(id);
            return
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <DatabaseContext.Provider value={{
            createTeacher,
            updateTeacher,
            findAllTeachers,
            removeTeacher,
            findTeacherById,

            createClass,
            updateClass,
            findClassById,
            findAllClass,
            removeClass
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