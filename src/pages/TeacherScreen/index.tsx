import React, {  } from 'react';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';

import {
    Container,
    Content,
    Greetings
} from './styles';

export function TeacherScreen() {
    const { signOut } = useAuth();

    // Tela que um usuário com permissão de professor visualiza
    return (
        <Container>
            <Header exitButton actionButton={signOut} title="Professor" />

            <Content>
                <Greetings>
                    Bem Vindo Professor!
                </Greetings>
            </Content>
        </Container>
    );
}