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