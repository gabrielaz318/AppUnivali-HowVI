import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;

    padding-top: ${getStatusBarHeight()+4}px;
    padding-bottom: 4px;
    margin-bottom: 16px;

    background-color: ${({ theme }) => theme.colors.blue};

    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(23)}px;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.roboto_500};
    text-align: center;

    padding-top: 2px;
`;

export const Logo = styled.Image`
`;

export const BackButton = styled.TouchableOpacity`
    margin-left: 10px;
    padding: 6px;
`;

