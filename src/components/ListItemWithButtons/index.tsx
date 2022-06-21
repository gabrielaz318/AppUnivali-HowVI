import React from 'react';
import { Feather } from "@expo/vector-icons";

import {
    Container,
    Title,
    ButtonsWrapper,
    Button,
} from './styles';

interface IListItemWithButtons {
    title: string;
    firstIconName: keyof typeof Feather.glyphMap;
    firstIconSize?: number;
    firstIconColor: string;
    firstIconAction: (key: string, title: string) => void;
    secondIconName?: keyof typeof Feather.glyphMap;
    secondIconColor?: string;
    secondIconSize?: number;
    secondIconAction?: (key: string) => void;
    keyProp: string;
}

export function ListItemWithButtons({
    title,
    keyProp,
    firstIconName,
    firstIconColor,
    firstIconSize,
    firstIconAction,
    secondIconName,
    secondIconColor,
    secondIconSize,
    secondIconAction,
}: IListItemWithButtons) {
    function handlePressFirstButton() {
        firstIconAction(keyProp, title);
    }

    function handlePressSecondButton() {
        secondIconAction(keyProp);
    }

    return (
        <Container>
            <Title>{title}</Title>
            <ButtonsWrapper>
                {!!secondIconName && <Button onPress={handlePressSecondButton}>
                    <Feather 
                        name={secondIconName}
                        size={!!secondIconSize ? secondIconSize : 28}
                        color={secondIconColor}
                    />
                </Button>}
                <Button style={{ marginLeft: 8 }} onPress={handlePressFirstButton}>
                    <Feather 
                        name={firstIconName}
                        size={!!firstIconSize ? firstIconSize : 28}
                        color={firstIconColor}
                    />
                </Button>
            </ButtonsWrapper>
        </Container>
    );
}