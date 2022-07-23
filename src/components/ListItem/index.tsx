import React from 'react';

import {
    Container,
    Title,
} from './styles';

interface IListItem {
    title: string;
}

export function ListItem({ title }: IListItem) {

    // Componente essencial para ser o item das listas
    return (
        <Container>
            <Title>{title}</Title>
        </Container>
    );
}