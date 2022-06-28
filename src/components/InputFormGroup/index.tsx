import React from 'react';
import { TextInputProps } from 'react-native';

import {
    InputTitle,
    Input
} from './styles';

interface IInputFormGroup extends TextInputProps {
    label: string;
    inputType: 'numeric' | 'default';
}

export function InputFormGroup({ label, inputType = 'default',...rest }: IInputFormGroup) {
    // Componente de input esta presente no formulário de cadastro e criação
    // Serve para centralizar e facilitar a adição de input com labels customizados
    return (
        <>
            <InputTitle>{label}</InputTitle>
            <Input
                keyboardType={inputType}
                {...rest}
            />
        </>
    );
}