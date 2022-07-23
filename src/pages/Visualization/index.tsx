import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { Divider } from '../../components/Divider';
import { Header } from '../../components/Header';
import { ListItemWithButtons } from '../../components/ListItemWithButtons';
import { useAuth } from '../../hooks/useAuth';
import { useDatabase } from '../../hooks/useDatabase';

import {
    Container,
    Content,
    TotalsContainer,
    TitleTotal,
    TotalType,
    TotalNumber,
} from './styles';

// Opções para o usuário navegar
const buttons = [
    {
        name: "Visualizar Salas",
        key: "view.class"
    },
    {
        name: "Visualizar Alunos",
        key: "view.student"
    },
    {
        name: "Visualizar Professores",
        key: "view.teacher"
    }
]

export function Visualization() {
    const theme = useTheme();
    const { signOut } = useAuth();
    const { findAllClass, findAllTeachers, findAllStudents } = useDatabase();
    const navigation = useNavigation();
    const [totals, setTotals] = useState({ teachers: 0, class: 0, students: 0 });

    // Função para avancar para tela de situalização de um determinado tipo
    function handleNavigate(key: string, title: string) {
        navigation.navigate("ViewCategory", { key, title, type: key });
    }

    // Função que recupera dados gerais cadastrados 
    async function getTotals() {
        const allTeachers = await findAllTeachers();
        const allClass = await findAllClass();
        const allStudents = await findAllStudents();

        setTotals({ 
            teachers: !!allTeachers ? allTeachers.length : 0,
            class: !!allClass ? allClass.length : 0,
            students: !!allStudents ? allStudents.length : 0
         });
    }

    // Função executado toda vez que o usuário acessa a tela
    useFocusEffect(
        useCallback(() => {
            getTotals();
        },[])
    );

    return (
        <Container>
            <Header exitButton actionButton={signOut} title="Visualizar" />

            <Content>
                <FlatList
                    data={buttons}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <ListItemWithButtons
                            title={item.name}
                            keyProp={item.key}
                            firstIconName="chevron-right"
                            firstIconColor={theme.colors.black}
                            firstIconAction={handleNavigate}
                        />
                    )}
                    ItemSeparatorComponent={() => (
                        <Divider />
                    )}
                />

                <TotalsContainer>
                    <TitleTotal>Total por tipo</TitleTotal>

                    <TotalType>
                        Total de Salas: <TotalNumber>{totals.class}</TotalNumber>
                    </TotalType>
                    <TotalType>
                        Total de Professores: <TotalNumber>{totals.teachers}</TotalNumber>
                    </TotalType>
                    <TotalType>
                        Total de Alunos: <TotalNumber>{totals.students}</TotalNumber>
                    </TotalType>
                </TotalsContainer>
            </Content>
        </Container>
    );
}