import React from "react";
import { Visualization } from "../pages/Visualization";
import { Form } from "../pages/Form";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ViewCategory } from "../pages/ViewCategory";

const { Navigator, Screen } = createNativeStackNavigator();

export function VisualizationRoutes() {
	return (
        // Container das rotas de visualização
        <Navigator
            screenOptions={{
                headerShown: false  
            }}
            initialRouteName="Visualization"
        >
            <Screen 
                name="Visualization"
                component={Visualization}
            />
            <Screen 
                name="Form"
                component={Form}
            />
            <Screen 
                name="ViewCategory"
                component={ViewCategory}
            />
        </Navigator>
	);
}