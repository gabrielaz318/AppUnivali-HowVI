import React from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { Divider } from '../../components/Divider';
import { Header } from '../../components/Header';
import { ListItemWithButtons } from '../../components/ListItemWithButtons';

import {
    Container,
    Content
} from './styles';

const buttons = [
    {
        name: "Adicionar Sala",
        key: "add.class"
    },
    {
        name: "Adicionar Professor",
        key: "add.teacher"
    },
    {
        name: "Adicionar Aluno",
        key: "add.student"
    },
    {
        name: "Adicionar Aula",
        key: "add.lesson"
    },
]

export function Registration() {
    const theme = useTheme();

    return (
        <Container>
            <Header title="Cadastros" />

            <Content>
                <FlatList 
                    data={buttons}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <ListItemWithButtons 
                            title={item.name}
                            firstIconName="plus"
                            firstIconColor={theme.colors.black}
                            firstIconAction={()=>{}}
                        />
                    )}
                    ItemSeparatorComponent={() => (
                        <Divider />
                    )}
                />

            </Content>
        </Container>
    );
}