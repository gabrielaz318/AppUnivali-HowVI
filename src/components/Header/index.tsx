import React from 'react';
import { Feather } from "@expo/vector-icons";

import {
    Container,
    Title,
    BackButton,
    Logo
} from './styles';

import LogoSmallWhite from "../../assets/logo_small_white.png"
import { useTheme } from 'styled-components';

interface IHeader {
    title: string;
    backButton?: boolean;
    exitButton?: boolean;
    actionButton?: () => void;
}

export function Header({ title, backButton = false, actionButton, exitButton }: IHeader) {
    const theme = useTheme();

    // Item para o cabeçalho de cada tela
    // Este componente é preparado para receber alguns tipos de configurações
    // se adaptando facilmente a mais um tipo de cabeçalho diferente
    return (
        <Container>
            {backButton ? <BackButton onPress={actionButton}>
                <Feather 
                    name="chevron-left"
                    size={30}
                    color={theme.colors.white}
                /> 
            </BackButton> :
            exitButton ?
            <BackButton onPress={actionButton}>
                <Feather 
                    name="log-out"
                    size={30}
                    color={theme.colors.white}
                />
            </BackButton> :
            <Logo style={{ opacity: 0 }} source={LogoSmallWhite} />}
            <Title>{title}</Title>
            <Logo source={LogoSmallWhite} />
        </Container>
    );
}