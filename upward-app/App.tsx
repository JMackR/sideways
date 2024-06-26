import { DropdownAlertService, ErrorBoundary, GenericErrorFallback } from '@upward/core-ui-widgets';
import { Podcast } from '@upward/encourage';
import { store } from '@upward/store';
import { ThemeProvider } from '@upward/themes';
import '@upward/translations/i18n/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { findBestLanguageTag } from 'react-native-localize';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { RootNavigator } from '@upward/navigation';
import { AuthBootstrapProvider } from '@upward/authentication';

type findBestLanguageTag = (languageTags: string[]) => { languageTag: string; isRTL: boolean } | void;

function App(): React.JSX.Element {
  const { i18n } = useTranslation();
  const fallback = { languageTag: 'en', isRTL: false };
  const { languageTag } = findBestLanguageTag(['en', 'es']) || fallback;
  i18n.changeLanguage(languageTag);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AuthBootstrapProvider>
          <ErrorBoundary FallbackComponent={GenericErrorFallback}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <ThemeProvider>
                <DropdownAlertService>
                  <RootNavigator />
                  <Podcast />
                </DropdownAlertService>
              </ThemeProvider>
            </GestureHandlerRootView>
          </ErrorBoundary>
        </AuthBootstrapProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
