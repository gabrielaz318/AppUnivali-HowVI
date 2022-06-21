import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.colors.black_800};
    font-family: ${({ theme }) => theme.fonts.roboto_400};
`;

export const ButtonsWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Button = styled.TouchableOpacity`
    padding: 4px;
`;
