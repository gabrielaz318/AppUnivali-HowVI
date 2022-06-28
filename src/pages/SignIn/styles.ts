import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
`;

export const Content = styled.KeyboardAvoidingView`
    align-items: center;

    margin-top: ${getStatusBarHeight()+40}px;
`;

export const Logo = styled.Image`
    width: 200px;
    height: 240px;
`;

export const Greetings = styled.View`
    align-items: center;
`;

export const Wellcome = styled.Text`
    font-family: ${({ theme }) => theme.fonts.roboto_700};
    font-size: ${RFValue(35)}px;
    color: ${({ theme }) => theme.colors.blue};
`;

export const Instructions = styled.Text`
    font-family: ${({ theme }) => theme.fonts.roboto_300};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.black_800};
    text-align: center;

    margin-top: 12px;
`;

export const Form = styled.View`
    width: 85%;

    margin-top: 20px;
`;

export const ButtonSignin = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.blue};

    align-items: center;

    padding: 8px;
`;

export const TextButton = styled.Text`
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.roboto_500};
    font-size: ${RFValue(18)}px;
`;

export const Footer = styled.View`
    margin-top: 25%;
`;

export const Credits = styled.Text`
    font-family: ${({ theme }) => theme.fonts.roboto_500};
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.colors.blue};
    text-align: center;

    margin-bottom: 20px;
`;

export const ContainerCheckbox = styled.View`
    flex-direction: row;
    align-items: center;

    margin-bottom: 16px;
`;

export const ButtonCheckbox = styled.TouchableOpacity`

`;

export const TextCheckbox = styled.Text`
    margin-left: 8px;

    color: ${({ theme }) => theme.colors.black_800};
    font-size: ${RFValue(13)}px;
    font-family: ${({ theme }) => theme.fonts.roboto_400};
`;