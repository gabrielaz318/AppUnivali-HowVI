import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { InputFormGroup } from '../../components/InputFormGroup';
import { CreateTeacherProps } from '../../DTO/teacher';
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
    
    async function send() {
        if(type == 'add.class' || type == 'view.class') {
            if(title == 'Atualizar') {
                await updateClass(classNumber, +key)
            } else {
                await createClass(classNumber);
            }

        } else if (type == 'view.teacher' || type == 'add.teacher') {
            if(title == 'Atualizar') {
                await updateTeacher({ id: key, name: teacherName, password: teacherPassword, user: teacherUser, subjects: teacherSubjects })
            } else {
                await createTeacher({ name: teacherName, password: teacherPassword, user: teacherUser, subjects: teacherSubjects })
            }
        }
        
        navigation.goBack();
    }

    function handleBack() {
        navigation.goBack();
    }

    async function getInfoUpdate() {
        let response;
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
                console.log(response)
                setClassNumber(String(response.name));
                break;
        
            default:
                break;
        }
    }
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