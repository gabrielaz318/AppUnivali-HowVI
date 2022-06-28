import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from '../pages/SignIn';
import { useAuth } from '../hooks/useAuth';
import { TabsRoutes } from './tabs.routes';
import { TeacherScreen } from '../pages/TeacherScreen';


export function Routes() {
	const { user } = useAuth();

	return (
		// Container Pai que reune todas as telas e organiza a visualização do usuário de acordo com a permissão
		<NavigationContainer>
			{!!user ? 
			user.permission == 1 ? <TabsRoutes /> : <TeacherScreen />
			: <SignIn />} 
		</NavigationContainer>
	);
}