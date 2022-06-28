import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IContainer{
    hasLabel: boolean;
}

export const Container = styled.TextInput<IContainer>`
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.black_800};

    font-size: ${RFValue(15)}px;

    padding: 8px 16px;
    ${({ hasLabel }) => !hasLabel ? css`margin-bottom: 16px;` : css`margin-bottom: 4px;`}
`;

export const LabelButton = styled.TouchableWithoutFeedback``;

export const Label = styled.Text`
    color: ${({ theme }) => theme.colors.blue};
    font-size: ${RFValue(11.5)}px;
    font-family: ${({ theme }) => theme.fonts.roboto_400};
    text-align: right;
`;