import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IFooter {
    heightBottomTabs: number;
}

export const Container = styled.View`
    flex: 1;
    align-items: center;
`;

export const FormContainer = styled.View`
    flex: 1;

    width: 85%;
`;

export const Footer = styled.View<IFooter>`
    margin-bottom: ${({  heightBottomTabs}) => heightBottomTabs+36}px;

    justify-content: center;
`;

export const SaveButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.green};

    padding: 4px 30px;
`;

export const TextButton = styled.Text`
    font-size: ${RFValue(17)}px;
    color: #FFF;
    font-family: ${({ theme }) => theme.fonts.roboto_500};
`;
