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
    firstIconAction: () => void;
    secondIconName?: keyof typeof Feather.glyphMap;
    secondIconColor?: string;
    secondIconSize?: number;
    secondIconAction?: () => void;
}

export function ListItemWithButtons({
    title,
    firstIconName,
    firstIconColor,
    firstIconSize,
    firstIconAction,
    secondIconName,
    secondIconColor,
    secondIconSize,
    secondIconAction
}: IListItemWithButtons) {
    return (
        <Container>
            <Title>{title}</Title>
            <ButtonsWrapper>
                {!!secondIconName && <Button>
                    <Feather 
                        name={secondIconName}
                        size={!!secondIconSize ? secondIconSize : 28}
                        color={secondIconColor}
                    />
                </Button>}
                <Button style={{ marginLeft: 8 }}>
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