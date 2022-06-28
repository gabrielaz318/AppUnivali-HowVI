import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
`;

export const Content = styled.View`
    width: 85%;
`;

export const TextEmptyList = styled.Text`
    color: ${({ theme }) => theme.colors.black_800};
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.roboto_400};
    text-align: center;
`;