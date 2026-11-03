import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import HeroAvatarHUD from './src/components/HeroAvatarHUD';
import StatsControlPanel from './src/components/StatsControlPanel';
import ArmoryGrid from './src/components/ArmoryGrid';
import ReduxLiveInspector from './src/components/ReduxLiveInspector';
import { store } from './src/store';

export default function App() {
  return <Provider store={store}>
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#10121e' }}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={{ padding: 16, gap: 14, width: '100%', maxWidth: 660, alignSelf: 'center' }}>
          <View style={{ gap: 4, marginBottom: 4 }}>
            <Text style={{ color: '#c4a7ff', fontWeight: '800', letterSpacing: 2 }}>⚒  TALLER DE ESTADO VISUAL</Text>
            <Text accessibilityRole="header" style={{ color: '#f6f3ff', fontSize: 34, fontWeight: '900' }}>HeroForge RPG</Text>
            <Text style={{ color: '#adafc8' }}>Entrena, equipa y prueba tu héroe contra el dragón.</Text>
          </View>
          <HeroAvatarHUD />
          <StatsControlPanel />
          <ArmoryGrid />
          <ReduxLiveInspector />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  </Provider>;
}
