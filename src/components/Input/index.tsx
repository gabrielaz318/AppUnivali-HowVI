import React from 'react';
import { Alert, TextInput } from 'react-native';

import {
    Container,
    LabelButton,
    Label,
} from './styles';

interface IInput {
    placeholder: string;
    label?: string;
    onChange: (oldState: string) => void;
    password?: boolean;
    onSubmiting?: () => void;
}
 
const Input = React.forwardRef<TextInput, IInput>(({ password = false, onSubmiting = ()=>{}, onChange, placeholder, label = null }, ref) => {
    function handlePressLabel() {
        Alert.alert("Recuperar senha", "Entre em contato com a secretaria através do e-mail:\n\nsecretaria@univali.com.br");
    }

    return (
        <>
            <Container
                ref={ref}
                onChangeText={onChange}
                placeholder={placeholder}
                hasLabel={!!label}
                secureTextEntry={password}
                onSubmitEditing={onSubmiting}
            />
            {!!label && <LabelButton onPress={handlePressLabel}>
                <Label>{label}</Label>
            </LabelButton>}
        </>
    );
})

export { Input }