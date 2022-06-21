import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from '../pages/SignIn';
import { useAuth } from '../hooks/useAuth';
import { TabsRoutes } from './tabs.routes';
import { Form } from '../pages/Form';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
	const { user } = useAuth();

	return (
		<NavigationContainer>
			{/* {!!user?.name ? <TabsRoutes /> : <SignIn />}  */}
			<TabsRoutes />
		</NavigationContainer>
	);
}