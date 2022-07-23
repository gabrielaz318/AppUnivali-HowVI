import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Divider } from '../../components/Divider';
import { Header } from '../../components/Header';
import { ListItem } from '../../components/ListItem';
import { useAuth } from '../../hooks/useAuth';
import { useDatabase } from '../../hooks/useDatabase';

import {
    Container,
    Content,
    EmptyList,
    Greetings,
    TitleType
} from './styles';

export function UserScreen() {
    const { signOut, user } = useAuth();
    const { findAllStudents, findAllTeachers, findAllClass } = useDatabase();
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [classes, setClasses] = useState([]);

    async function getList() {
        try {
            if(user.permission == 3) {
                const listStudents = await findAllStudents();
                const listClasses = await findAllClass();
                setStudents(listStudents);
                setClasses(listClasses);
            } else {
                const listTeachers = await findAllTeachers();
                const listStudents = await findAllStudents();
                const listClasses = await findAllClass();
                setTeachers(listTeachers);
                setStudents(listStudents);
                setClasses(listClasses);

            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getList();
    },[])

    // Tela que um usuário com permissão de professor visualiza
    return (
        <Container>
            <Header exitButton actionButton={signOut} title={user.permission == 3 ? 'Aluno' : 'Professor'}/>

            <Content 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{
                    paddingBottom: 48
                }}
            >
                <Greetings>
                    {user.permission == 3 ? 'Bem vindo Aluno(a)!' : 'Bem vindo Professor(a)!'}
                </Greetings>
                
                { user.permission == 2 && <TitleType>Professores cadastrados:</TitleType> }
                {   
                    user.permission == 2 && teachers.length == 0 ? 
                        <EmptyList>Nenhum sala cadastrada</EmptyList>
                    : user.permission == 2 && teachers.map((item, index) => {
                        if(index != (teachers.length -1)) {
                            return (
                                <>
                                    <ListItem key={String(item.key+item.name)} title={`Nome: ${item.name}`} />
                                    <Divider key={String(item.key+1+item.name)}/>
                                </>
                            )
                        } else {
                            return (
                                <ListItem key={String(item.key+item.name)} title={`Nome: ${item.name}`} />
                            )
                        }
                    })
                }

                { user.permission == 2 && <Divider /> }

                <TitleType>Alunos cadastrados:</TitleType>
                {
                    students.length == 0 ?
                        <EmptyList>Nenhum sala cadastrada</EmptyList>
                    : students.map((item, index) => {
                        if(index != (students.length -1)) {
                            return (
                                <>
                                    <ListItem key={String(item.key+item.name)} title={`Nome: ${item.name}`} />
                                    <Divider />
                                </>
                            )
                        } else {
                            return (
                                <ListItem key={String(item.key+item.name)} title={`Nome: ${item.name}`} />
                            )
                        }
                    })
                }

                <Divider />

                <TitleType>Salas cadastradas:</TitleType>
                {
                    classes.length == 0 ? 
                        <EmptyList>Nenhum sala cadastrada</EmptyList>
                    : classes.map((item, index) => {
                        if(index != (classes.length -1)) {
                            return (
                                <>
                                    <ListItem key={String(item.key)} title={`Número: ${item.name}`} />
                                    <Divider />
                                </>
                            )
                        } else {
                            return (
                                <ListItem key={String(item.key)} title={`Número: ${item.name}`} />
                            )
                        }
                    })
                }
            </Content>
        </Container>
    );
}