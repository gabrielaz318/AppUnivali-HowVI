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
} from './styles';

import LogoLargePng from "../../assets/logo_large_blue.png"; 
import { Alert, TextInput } from 'react-native';

export function SignIn() {
    const userInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    function handleFocuInputPassword() {
        passwordInputRef.current?.focus();
    }

    function handleAccess() {
        if(user.trim().length == 0 || password.trim().length == 0) {
            Alert.alert("Campo não preenchido", "Digite seu usuário e senha corretamente para realizar seu login");
            return
        }
        if(user.trim() !== 'admin' && password.trim() !== '12345') {
            Alert.alert("Acesso negado", "As credenciais informadas são inválidas.");
            return
        }
        Alert.alert("Bem Vindo")
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