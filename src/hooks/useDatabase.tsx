import {
    ReactNode, 
    useContext, 
    useState, 
    createContext
} from "react";
import { InteractionManager } from "react-native";

import Class from "../database/Class";
import Teacher from "../database/Teacher";

import { CreateTeacherProps, UpdateTeacherProps, ReturnFindAllTeachers } from "../DTO/teacher";
import { ReturnClassById, ReturnFindAllClass } from "../DTO/class";

const DatabaseContext = createContext({} as DatabaseContextDataProps)

interface DatabaseProviderProps {
    children: ReactNode;
}

interface DatabaseContextDataProps {
    createTeacher: (data: CreateTeacherProps) => Promise<void>;
    updateTeacher: (data: UpdateTeacherProps) => Promise<void>;
    findAllTeachers: () => Promise<ReturnFindAllTeachers[]>;
    removeTeacher: (id: number) => Promise<void>;
    findTeacherById: (id: number) => Promise<UpdateTeacherProps>;

    createClass: (number: string) => Promise<void>;
    updateClass: (number: string, id: number) => Promise<void>;
    findAllClass: () => Promise<ReturnFindAllClass[]>;
    findClassById: (id: number) => Promise<ReturnClassById>;
    removeClass: (id: number) => Promise<void>;
}

function DatabaseProvider({ children }: DatabaseProviderProps) {

    async function createTeacher(data: CreateTeacherProps) {
        try {
            await Teacher.create({ nome: data.name, usuario: data.user, senha: data.password, materia: data.subjects })
            return
        } catch (error) {
            console.log(error)
        }
    }

    async function updateTeacher(data: UpdateTeacherProps) {
        try {
            await Teacher.update({ id: data.id ,nome: data.name, usuario: data.user, senha: data.password, materia: data.subjects })
            return
        } catch (error) {
            console.log(error)
        }
    }

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

    async function removeTeacher(id: number) {
        try {
            await Teacher.remove(id)
            return
        } catch (error) {
            console.log(error)
        }
    }

    async function createClass(number: string) {
        console.log(createClass)
        try {
            await Class.create({numero: number});
            return
        } catch (error) {
            
        }
    }

    async function updateClass(number: string, id: number) {
        try {
            console.log(number, id)
            await Class.update({numero: number, id});
            return
        } catch (error) {
            
        }
    }

    async function findAllClass() {
        try {
            const response = await Class.findAll();
            console.log(response)
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

    async function findClassById(id: number) {
        try {
            const response = await Class.findById(id);
            return [response].map(item => {return{ name: item.numero, key: item.id }})[0];
        } catch (error) {
            console.log(error)
        }
    }

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