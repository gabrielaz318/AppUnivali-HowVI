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
        name: "Visualizar Salas",
        key: "view.class"
    },
    {
        name: "Visualizar Professores",
        key: "view.teacher"
    },
    {
        name: "Visualizar Alunos",
        key: "view.student"
    },
    {
        name: "Visualizar Aulas",
        key: "view.lesson"
    },
]

export function Visualization() {
    const theme = useTheme();

    return (
        <Container>
            <Header title="Visualizar" />

            <Content>
                <FlatList
                    data={buttons}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <ListItemWithButtons
                            title={item.name}
                            firstIconName="chevron-right"
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