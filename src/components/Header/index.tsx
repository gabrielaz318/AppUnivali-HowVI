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
    actionButton?: () => void;
}

export function Header({ title, backButton = false, actionButton }: IHeader) {
    const theme = useTheme();

    return (
        <Container>
            {backButton ? <BackButton onPress={actionButton}>
                <Feather 
                    name="chevron-left"
                    size={30}
                    color={theme.colors.white}
                />
            </BackButton> : <Logo style={{ opacity: 0 }} source={LogoSmallWhite} />}
            <Title>{title}</Title>
            <Logo source={LogoSmallWhite} />
        </Container>
    );
}