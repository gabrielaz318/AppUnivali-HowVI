import React, { useRef, useState } from 'react';
import { Input } from '../../components/Input';

import {
    Container,
    Content,
    Logo,
    Greetings,
    Wellcome,
    Instructions,
    Form,
    ButtonSignin,
    Footer,
    Credits,
    TextButton,
    ButtonCheckbox,
    ContainerCheckbox,
    TextCheckbox
} from './styles';

import LogoLargePng from "../../assets/logo_large_blue.png"; 
import { Alert, TextInput } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { Feather } from '@expo/vector-icons';

export function SignIn() {
    const { signIn } = useAuth();
    const userInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const [user, setUser] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [password, setPassword] = useState('');

    // Função para "focar" no input de senha
    function handleFocuInputPassword() {
        passwordInputRef.current?.focus();
    }

    // Função para realizar o acesso no app
    async function handleAccess() {
        if(user.trim().length == 0 || password.trim().length == 0) {
            Alert.alert("Campo não preenchido", "Digite seu usuário e senha corretamente para realizar seu login");
            return
        }
        try {
            await signIn(user, password, checkbox);
        } catch (error) {
            Alert.alert('Acesso negado', 'Verifique o usuário e senha utilizados e tente novamente.');
        }
    }

    return (
        <Container>
            <Content behavior="padding">
                <Logo source={LogoLargePng} />
                <Greetings>
                    <Wellcome>Bem vindo!</Wellcome>
                    <Instructions>
                        Insira seus dados{'\n'}
                        de acesso para utilizar o App
                    </Instructions>
                </Greetings>
                <Form>
                    <Input 
                        ref={userInputRef}
                        onChange={setUser}
                        key="UserInput"
                        placeholder="Usuário"
                        onSubmiting={handleFocuInputPassword}
                    />
                    <Input 
                        ref={passwordInputRef}
                        onChange={setPassword}
                        key="PasswordInput"
                        placeholder="Senha"
                        label="Esqueci minha senha"
                        password={true}
                        onSubmiting={handleAccess}
                    />
                    <ContainerCheckbox>
                        <ButtonCheckbox activeOpacity={.7} onPress={() => setCheckbox(oldState => !oldState)}>
                            {
                                checkbox ?
                                <Feather 
                                    name="check-square"
                                    size={26}
                                    color="#000"
                                /> :
                                <Feather 
                                    name="square"
                                    size={26}
                                    color="#000"
                                />
                            }
                        </ButtonCheckbox>
                        <TextCheckbox>Sou aluno</TextCheckbox>
                    </ContainerCheckbox>
                    <ButtonSignin onPress={handleAccess} activeOpacity={.7}>
                        <TextButton>Entrar</TextButton>
                    </ButtonSignin>
                </Form>
            </Content>
            <Footer>
                <Credits>By Gabriel Azevedo</Credits>
            </Footer>
        </Container>
    );
}