import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const InputTitle = styled.Text`
    font-size: ${RFValue(17)}px;
    color: ${({ theme }) => theme.colors.black_800};
    font-family: ${({ theme }) => theme.fonts.roboto_400};
`;

export const Input = styled.TextInput`
    color: ${({ theme }) => theme.colors.black_800};
    font-family: ${({ theme }) => theme.fonts.roboto_400};

    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.black_800};

    padding: 2px 10px;
    margin-bottom: 12px;
`;