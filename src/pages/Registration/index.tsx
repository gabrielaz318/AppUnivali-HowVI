import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { Divider } from '../../components/Divider';
import { Header } from '../../components/Header';
import { ListItemWithButtons } from '../../components/ListItemWithButtons';
import { useAuth } from '../../hooks/useAuth';

import {
    Container,
    Content
} from './styles';

const buttons = [
    {
        name: "Cadastrar Sala",
        key: "add.class"
    },
    {
        name: "Cadastrar Professor",
        key: "add.teacher"
    }
]

export function Registration() {
    const theme = useTheme();
    const { signOut } = useAuth();
    const navigation = useNavigation();

    // Função para navegar para tela de cadastro de um item
    function handleNavigate(key: string, title: string) {
        navigation.navigate("Form", { key, title, type: key });
    }

    return (
        <Container>
            <Header actionButton={signOut} exitButton title="Cadastros" />

            <Content>
                <FlatList 
                    data={buttons}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <ListItemWithButtons 
                            title={item.name}
                            keyProp={item.key}
                            firstIconName="plus"
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