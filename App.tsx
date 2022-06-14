import React, { useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import * as SplashScreen from 'expo-splash-screen';
import {
	useFonts,
	Roboto_300Light,
	Roboto_400Regular,
	Roboto_500Medium,
	Roboto_700Bold
} from '@expo-google-fonts/roboto';

import theme from './src/styles/theme';

import { Routes } from './src/routes';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';

export default function App() {
	// Função executado em toda abertura do App
	useEffect(() => {
		// Função que verifica atualização via OTA
		async function updateApp() {
			const { isAvailable } = await Updates.checkForUpdateAsync()
			if (isAvailable) {
				await Updates.fetchUpdateAsync()
				await Updates.reloadAsync()
			}
		}
		// Função que impede a splash de sumir
		async function prepare() {
			await SplashScreen.preventAutoHideAsync();
		}
		// updateApp();
		prepare();
	}, [])

	// Função que carrega as fontes
	const [fontsLoaded] = useFonts({
		Roboto_300Light,
		Roboto_400Regular,
		Roboto_500Medium,
		Roboto_700Bold
	});

	// função que verifica se as fontes já carregara para poder remover a splash
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
		  await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		// Componente pai de todo projeto
		<ThemeProvider theme={theme}>
			<StatusBar translucent style='dark' />
			<View onLayout={onLayoutRootView} style={{ flex: 1 }}>
				<Routes/>
			</View>
		</ThemeProvider>
	);
}