import React from 'react';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from '@expo/vector-icons';
import { Registration } from '../pages/Registration';
import { Visualization } from '../pages/Visualization';
import { RFValue } from 'react-native-responsive-fontsize';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabsRoutes() {
    const theme = useTheme();
    return (
        // COmponente pai da navegação e das telas
        <Navigator
            screenOptions={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarLabelStyle: {
                fontFamily: theme.fonts.roboto_400,
                fontSize: RFValue(13),
            },
            tabBarActiveTintColor: theme.colors.white,
            tabBarInactiveTintColor: theme.colors.white_300,
            tabBarStyle: {
                backgroundColor: theme.colors.blue,
                borderTopColor: 'transparent',
                position: 'absolute',
                bottom: 0,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
            },
            }}
            initialRouteName='Registration'
        >   
            {/* Tela de registro  */}
            <Screen 
                name='Registration'
                component={Registration}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name='plus'
                            size={20}
                            color={focused ? theme.colors.white : theme.colors.white_300}
                        />
                    ),
                }}
            />
            {/* Tela de visualização */}
            <Screen 
                name='Visualization'
                component={Visualization}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name='list'
                            size={22}
                            color={focused ? theme.colors.white : theme.colors.white_300}
                        />
                    )
                }}
            />
        </Navigator>
    )
}