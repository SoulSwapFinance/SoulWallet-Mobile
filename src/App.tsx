// Copyright 2019-2022 @subwallet/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { CreateAccount } from 'screens/CreateAccount';
import { StatusBar } from 'react-native';
import { ThemeContext } from 'providers/contexts';
import { THEME_PRESET } from 'styles/themes';
import { ToastProvider } from 'react-native-toast-notifications';
import { QrScanner } from 'screens/QrScanner';
import { QrScannerProvider } from 'providers/QrScannerProvider';
import { RootStackParamList } from 'types/routes';
import { Home } from 'screens/Home';
import { AccountsScreen } from 'screens/AccountsScreen';
import { EditAccount } from 'screens/EditAccount';
import { RemoveAccount } from 'screens/RemoveAccount';
import { RestoreJson } from 'screens/RestoreJson';
import { ViewPrivateKey } from 'screens/ViewPrivateKey';
import { NetworkSelect } from 'screens/NetworkSelect';
import { FirstScreen } from 'screens/FirstScreen';
import { ImportSecretPhrase } from 'screens/ImportSecretPhrase';
import { NetworksSetting } from 'screens/NetworksSetting';
import { STATUS_BAR_HEIGHT } from 'styles/sharedStyles';
import { SendFund } from 'screens/Sending';
import { Settings } from 'screens/Settings';
import { Languages } from 'screens/Settings/Languages';
import { Security } from 'screens/Settings/Security';
import { ExportJson } from 'screens/ExportJson';
import { ImportPrivateKey } from 'screens/ImportPrivateKey';
import { PinCodeScreen } from 'screens/Settings/Security/PinCodeScreen';
import { WebViewDebugger } from 'screens/WebViewDebugger';
import useCheckEmptyAccounts from 'hooks/useCheckEmptyAccounts';

export const App = () => {
  const isEmptyAccounts = useCheckEmptyAccounts();
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const isDarkMode = true;
  const theme = isDarkMode ? THEME_PRESET.dark : THEME_PRESET.light;
  StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');

  return (
    <ToastProvider
      duration={1500}
      placement="top"
      normalColor={theme.colors.notification}
      successColor={theme.colors.primary}
      warningColor={theme.colors.notification_warning}
      offsetTop={STATUS_BAR_HEIGHT + 40}
      dangerColor={theme.colors.notification_danger}>
      <QrScannerProvider navigationRef={navigationRef}>
        <ThemeContext.Provider value={theme}>
          <NavigationContainer ref={navigationRef} theme={theme}>
            <Stack.Navigator
              initialRouteName={isEmptyAccounts ? 'FirstScreen' : 'Home'}
              screenOptions={{
                animation: 'fade_from_bottom',
              }}>
              <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name="FirstScreen" component={FirstScreen} />
                <Stack.Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
                <Stack.Screen name="AccountsScreen" component={AccountsScreen} />
                <Stack.Screen name="EditAccount" component={EditAccount} />
                <Stack.Screen name="RestoreJson" component={RestoreJson} />
                <Stack.Screen name="ExportPrivateKey" component={ViewPrivateKey} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="RemoveAccount" component={RemoveAccount} />
                <Stack.Screen name="NetworkSelect" component={NetworkSelect} />
                <Stack.Screen name="NetworksSetting" component={NetworksSetting} />
                <Stack.Screen name="ImportSecretPhrase" component={ImportSecretPhrase} />
                <Stack.Screen name="ImportPrivateKey" component={ImportPrivateKey} />
                <Stack.Screen name="SendFund" component={SendFund} />
                <Stack.Screen name="Languages" component={Languages} />
                <Stack.Screen name="Security" component={Security} />
                <Stack.Screen name="PinCode" component={PinCodeScreen} />
                <Stack.Screen name="ExportJson" component={ExportJson} />
                <Stack.Screen name="WebViewDebugger" component={WebViewDebugger} />
              </Stack.Group>
              <Stack.Group
                screenOptions={{
                  presentation: 'modal',
                  headerShown: false,
                }}>
                <Stack.Screen name="QrScanner" component={QrScanner} />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeContext.Provider>
      </QrScannerProvider>
    </ToastProvider>
  );
};

export default App;
