import { TamaguiProvider } from 'tamagui'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import config from '../tamagui.config'

export default function RootLayout() {
  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0A0A0A' },
          }}
        />
      </SafeAreaProvider>
    </TamaguiProvider>
  )
}
