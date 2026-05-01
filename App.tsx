import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SavedLocationsProvider} from './src/hooks/useSavedLocations';
import {RootNavigator} from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SavedLocationsProvider>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <RootNavigator />
      </SavedLocationsProvider>
    </SafeAreaProvider>
  );
}

export default App;
