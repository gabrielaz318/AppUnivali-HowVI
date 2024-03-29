import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
`;

export const Content = styled.ScrollView`
    width: 85%;
`;

export const TotalsContainer = styled.View`
    margin-top: 78px;
`;

export const TitleTotal = styled.Text`
    color: ${({ theme }) => theme.colors.black_800};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.roboto_700};
    text-align: center;

    margin-bottom: 16px;
`;

export const TotalType = styled.Text`
    color: ${({ theme }) => theme.colors.black_800};
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.roboto_400};
`;

export const TotalNumber = styled.Text`
    color: ${({ theme }) => theme.colors.black_800};
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.roboto_500};
`;

export const Greetings = styled.Text`
    color: ${({ theme }) => theme.colors.black_800};
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.roboto_500};
    margin-top: 12px;
    text-align: center;
    margin-bottom: 24px;
`;

export const TitleType = styled.Text`
    color: ${({ theme }) => theme.colors.black_800};
    font-size: ${RFValue(19)}px;
    font-family: ${({ theme }) => theme.fonts.roboto_400};
    margin-top: 12px;

    margin-bottom: 24px;
`;

export const EmptyList = styled.Text`
    color: ${({ theme }) => theme.colors.black_800};
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.roboto_400};
    margin-top: 8px;
`;
