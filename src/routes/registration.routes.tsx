import React from "react";
import { Registration } from "../pages/Registration";
import { Form } from "../pages/Form";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

export function RegistrationRoutes() {
	return (
        // Container das rotas de cadastro
        <Navigator
            screenOptions={{
                headerShown: false  
            }}
            initialRouteName="Registration"
        >
            <Screen 
                name="Registration"
                component={Registration}
            />
            <Screen 
                name="Form"
                component={Form}
            />
        </Navigator>
	);
}