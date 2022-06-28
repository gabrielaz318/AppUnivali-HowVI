import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { Header } from '../../components/Header';
import { Divider } from '../../components/Divider';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { ListItemWithButtons } from '../../components/ListItemWithButtons';

import {
    Container, 
    Content,
    TextEmptyList,
} from './styles';
import { useDatabase } from '../../hooks/useDatabase';
import id from 'date-fns/esm/locale/id/index.js';

interface IParams {
    key: string;
    title: string;
    type: string;
}

interface IList {
    key: number;
    name: string;
}

export function ViewCategory() {
    const theme = useTheme();
    const { findAllTeachers, findAllClass, removeClass ,removeTeacher } = useDatabase();
    const { params } = useRoute();
    const { key, type, title } = params as IParams;
    const [list, setList] = useState<IList[]>([] as IList[])
    const navigation = useNavigation();

    // Função para voltar
    function handleBack() {
        navigation.goBack();
    }
    
    // Função para remover um item
    function handleRemoveItem(key: string) {
        Alert.alert(
            "Atenção",
            "Deseja realmente remover essa registro?",
            [
              {
                text: "Cancelar",
                style: "cancel"
              },
              { text: "Confirmar", onPress: async () => {
                    switch (type) {
                        case 'view.class':
                            await removeClass(+key);
                            getInfo();
                            break;
                        case 'view.teacher':
                            await removeTeacher(+key)
                            getInfo();
                            break;
                    
                        default:
                            break;
                    }
              }}
            ]
        );
    }

    // Fução para ir até a tela de atualizar um item
    function handleEditItem(keyInternal: string) {
        navigation.navigate("Form", { key: keyInternal, title: "Atualizar", type: key });
    }

    // Função para recuperar os itens de um determinado tipo
    async function getInfo() {
        let response
        switch (key) {
            case 'view.class':
                response = await findAllClass();
                setList(response);
                break;
            case 'view.teacher':
                response = await findAllTeachers();
                setList(response);
                break;
        
            default:
                break;
        }
    }

    // Função executado toda vez que o usuário acessa a tela
    useFocusEffect(
        useCallback(() => {
          getInfo();
        }, [])
    );

    return (
        <Container>
            <Header title={title} backButton actionButton={handleBack} />

            <Content>
                <FlatList 
                    data={list}
                    keyExtractor={item => String(item.key)}
                    renderItem={({ item }) => (
                        <ListItemWithButtons 
                            title={item.name}
                            keyProp={String(item.key)}

                            firstIconName="trash-2"
                            firstIconColor={theme.colors.red}
                            firstIconAction={handleRemoveItem}

                            secondIconName="settings"
                            secondIconColor={theme.colors.black}
                            secondIconAction={handleEditItem}

                        />
                    )}
                    ListEmptyComponent={() => <TextEmptyList>Nenhum registro encontrado</TextEmptyList>}
                    ItemSeparatorComponent={() => (
                        <Divider />
                    )}
                />
            </Content>
        </Container>
    );
}