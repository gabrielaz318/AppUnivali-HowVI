import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from '../pages/SignIn';
import { useAuth } from '../hooks/useAuth';
import { TabsRoutes } from './tabs.routes';

export function Routes() {
	const { user } = useAuth();

	return (
		<NavigationContainer>
			{!!user?.name ? <TabsRoutes/> : <SignIn />} 
		</NavigationContainer>
	);
}