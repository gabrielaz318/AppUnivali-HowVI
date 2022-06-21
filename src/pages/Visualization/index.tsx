import { useNavigation } from '@react-navigation/native';
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
    const navigation = useNavigation();

    function handleNavigate(key: string, title: string) {
        navigation.navigate("ViewCategory", { key, title, type: key });
    }

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
            </Content>
        </Container>
    );
}