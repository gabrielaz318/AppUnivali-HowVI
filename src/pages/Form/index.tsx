import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { Header } from '../../components/Header';
import { InputFormGroup } from '../../components/InputFormGroup';
import { ReturnClassById } from '../../DTO/class';
import { CreateTeacherProps, UpdateTeacherProps } from '../../DTO/teacher';
import { useDatabase } from '../../hooks/useDatabase';

import {
    Container,
    FormContainer,
    Footer,
    SaveButton,
    TextButton,
} from './styles';

interface IParams {
    key: string;
    title: string;
    type: string;
}

export function Form() {
    const { 
        createTeacher, 
        updateTeacher, 
        createClass, 
        findClassById, 
        updateClass, 
        findTeacherById 
    } = useDatabase();
    const navigation = useNavigation();
    const { params } = useRoute();
    const { key, title, type } = params as IParams;
    const heightBottomTabs = useBottomTabBarHeight();
    const [teacherName, setTeacherName] = useState('');
    const [teacherUser, setTeacherUser] = useState('');
    const [teacherPassword, setTeacherPassword] = useState('');
    const [teacherSubjects, setTeacherSubjects] = useState('');
    const [classNumber, setClassNumber] = useState('');
    
    // Função para enviar dados para suas determinadas funções:
    // - É possível criar um item para qualquer tipo
    // - É possível atualizar determinado item de um tipo
    async function send() {
        try {
            let success = false;
            if(type == 'add.class' || type == 'view.class') {
                if(classNumber.trim().length == 0) {
                    Alert.alert('Atenção', 'O campo com o número da sala não pode estar vazio.');
                    return
                }
                if(title == 'Atualizar') {
                    success = await updateClass(classNumber, +key)
                } else {
                    success = await createClass(classNumber);
                }
    
            } else if (type == 'view.teacher' || type == 'add.teacher') {
                if(teacherName.trim().length == 0 || teacherPassword.trim().length == 0 || teacherUser.trim().length == 0 || teacherSubjects.trim().length == 0) {
                    Alert.alert('Atenção', 'Preencha todos os campos antes de entar salvar os dados');
                    return
                }
                if(title == 'Atualizar') {
                    success = await updateTeacher({ id: key, name: teacherName, password: teacherPassword, user: teacherUser, subjects: teacherSubjects })
                } else {
                    success = await createTeacher({ name: teacherName, password: teacherPassword, user: teacherUser, subjects: teacherSubjects })
                }
            }
            if(success) {
                navigation.goBack();
            }
        } catch (error) {
            if(error === 'user_exist' || error === 'class_exist') {
                return
            }

            Alert.alert('Erro', 
            title == 'Atualizar' ? 'Houve um erro durante a atualização.': 'Houve um erro durante a criação');
        }
        
    }

    // Função para voltar para tela anterior
    function handleBack() {
        navigation.goBack();
    }

    // Função para recuperar as informações quando for necessário atualizar um registro
    async function getInfoUpdate() {
        let response: UpdateTeacherProps | ReturnClassById;
        switch (type) {
            case 'view.teacher':
                response = await findTeacherById(+key);
                setTeacherName(response.name);
                setTeacherUser(response.user);
                setTeacherPassword(response.password);
                setTeacherSubjects(response.subjects);
                break;
            case 'view.class':
                response = await findClassById(+key);
                setClassNumber(String(response.name));
                break;
        
            default:
                break;
        }
    }

    // Função executada ao abrir a tela
    useEffect(() => {
        if(title == 'Atualizar') {
            getInfoUpdate()
        }
    },[])

    return (
        <Container>
            <Header title={title} backButton actionButton={handleBack} />

            <FormContainer>
                {
                    (key === "add.class" || type == 'view.class') && <>
                        <InputFormGroup 
                            label="Número da sala:"
                            inputType="numeric"
                            value={classNumber}
                            onChangeText={setClassNumber}
                        />
                    </>
                }
                {
                    (key === "add.teacher" || type == 'view.teacher') && <>
                        <InputFormGroup 
                            label="Nome:"
                            inputType="default"
                            value={teacherName}
                            onChangeText={setTeacherName}
                        />
                        <InputFormGroup 
                            label="Usuário:"
                            inputType="default"
                            value={teacherUser}
                            onChangeText={setTeacherUser}
                        />
                        <InputFormGroup 
                            label="Senha:"
                            inputType="default"
                            value={teacherPassword}
                            onChangeText={setTeacherPassword}
                        />
                        <InputFormGroup 
                            label="Matéria:"
                            inputType="default"
                            value={teacherSubjects}
                            onChangeText={setTeacherSubjects}
                        />
                    </>
                }
            </FormContainer>

            <Footer heightBottomTabs={heightBottomTabs}>
                <SaveButton onPress={send} activeOpacity={.75}>
                    <TextButton>Salvar</TextButton>
                </SaveButton>
            </Footer>
        </Container>
    );
}