import { playbackServices } from '@/constants/playbackService'
import { colors } from '@/constants/tokens'
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState'
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TrackPlayer from 'react-native-track-player'

SplashScreen.preventAutoHideAsync()
TrackPlayer.registerPlaybackService(() => playbackServices)

const App = () => {

	useLogTrackPlayerState()
	const hanldeTrackPlayarLoaded = useCallback(()=> { 
		SplashScreen.hideAsync()
	},[])

	useSetupTrackPlayer({
		onLoad: hanldeTrackPlayarLoaded
	})
	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{flex:1}}>
				<RootNavigation />
				<StatusBar style='auto' />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	)
}

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			<Stack.Screen name='player' 
				options={{
					presentation:'card', 
					gestureEnabled:true, 
					gestureDirection:'vertical', 
					animationDuration:300, 
					headerShown:false
				}}
			/>
			<Stack.Screen 
				name='(modals)/addToPlaylist'
				options={{
					presentation:'modal',
					headerTitle:'Add to playlist',
					headerStyle:{
						backgroundColor: colors.background
					},
					headerTitleStyle:{
						color:colors.text
					}
				}}
			/>
		</Stack>
	)
}

export default App;