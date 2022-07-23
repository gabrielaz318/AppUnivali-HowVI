import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
export const Container = styled.View`
    flex-direction: row;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.colors.black_800};
    font-family: ${({ theme }) => theme.fonts.roboto_400};
`;
