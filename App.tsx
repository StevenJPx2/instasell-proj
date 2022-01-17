import 'react-native-reanimated';

import React from 'react';
import {DripsyProvider} from 'dripsy';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Navigation from './navigation';
import {theme} from './constants/Theme';

export default function App(): JSX.Element | null {
  return (
    <DripsyProvider theme={theme}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </DripsyProvider>
  );
}
