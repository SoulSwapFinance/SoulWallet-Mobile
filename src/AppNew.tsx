// Copyright 2019-2022 @soul-wallet/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { ExternalRequestContextProvider } from 'providers/ExternalRequestContext';
import { QrSignerContextProvider } from 'providers/QrSignerContext';
import { ScannerContextProvider } from 'providers/ScannerContext';
import { SigningContextProvider } from 'providers/SigningContext';
import React, { useEffect } from 'react';
import { AppState, StatusBar, StyleProp, View } from 'react-native';
import { ThemeContext } from 'providers/contexts';
import { THEME_PRESET } from 'styles/themes';
import { ToastProvider } from 'react-native-toast-notifications';
import { FontMedium, STATUS_BAR_HEIGHT } from 'styles/sharedStyles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import useAppLock from 'hooks/useAppLock';
import useCryptoReady from 'hooks/init/useCryptoReady';
import useSetupI18n from 'hooks/init/useSetupI18n';
import SplashScreen from 'react-native-splash-screen';
import { LoadingScreen } from 'screens/LoadingScreen';
import { ColorMap } from 'styles/color';
import { AutoLockState } from 'utils/autoLock';
import useStoreBackgroundService from 'hooks/store/useStoreBackgroundService';
import { TOAST_DURATION } from 'constants/index';
import AppNavigator from './AppNavigator';
import { updateShowZeroBalanceState } from 'stores/utils';
import { setBuildNumber } from './stores/AppVersion';
import { getBuildNumber } from 'react-native-device-info';

import { AppModalContextProvider } from './providers/AppModalContext';
import { CustomToast } from 'components/Design/Toast'
import { PortalProvider } from '@gorhom/portal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LockTimeout } from 'stores/types';
import { keyringLock } from './messaging';
import { updateAutoLockTime } from 'stores/MobileSettings';
import { useGetTokenConfigQuery } from 'stores/API';

const layerScreenStyle: StyleProp<any> = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: 'absolute',
  backgroundColor: ColorMap.dark1,
  zIndex: 10,
};

const gestureRootStyle: StyleProp<any> = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%',
  zIndex: 9999,
};

const autoLockParams: {
  hasMasterPassword: boolean;
  isUseBiometric: boolean;
  timeAutoLock?: number;
  lock: () => void;
  isPreventLock: boolean;
  isMasterPasswordLocked: boolean;
} = {
  hasMasterPassword: false,
  isUseBiometric: false,
  timeAutoLock: undefined,
  lock: () => {},
  isPreventLock: false,
  isMasterPasswordLocked: false,
};

let lockWhenActive = false;
AppState.addEventListener('change', (state: string) => {
  const { timeAutoLock, lock, isMasterPasswordLocked } = autoLockParams; // isUseBiometric
  const isUseBiometric = false

  if (timeAutoLock === undefined) {
    return;
  }
  if (AutoLockState.isPreventAutoLock) {
    return;
  }

  if (state === 'background') {
    if (timeAutoLock === LockTimeout.ALWAYS) {
      // Lock master password incase always require
      keyringLock().catch((e: Error) => console.log(e));
    }
    if (isUseBiometric) {
      lockWhenActive = true;
    } else {
      lockWhenActive = false;
      if (isMasterPasswordLocked) {
        lock();
      }
    }
  } else if (state === 'active') {
    if (lockWhenActive) {
      if (isMasterPasswordLocked) {
        lock();
      }
      lockWhenActive = false;
    }
  }
});

let firstTimeCheckPincode: boolean | undefined;
export let prevDeeplinkUrl = '';

export function setPrevDeeplinkUrl(value: string) {
  prevDeeplinkUrl = value;
}

export const isFirstOpen = { current: true };

export function setIsFirstOpen(value: boolean) {
  isFirstOpen.current = value;
}

export const AppNew = () => {
  const isDarkMode = true;
  const theme = isDarkMode ? THEME_PRESET.dark : THEME_PRESET.light;
  StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');

  const { timeAutoLock, isPreventLock } = useSelector((state: RootState) => state.mobileSettings); // isUseBiometric
  const { hasMasterPassword, isLocked } = useSelector((state: RootState) => state.accountState);
  const { lock, unlockApp } = useAppLock();
  const { buildNumber } = useSelector((state: RootState) => state.appVersion);
  const dispatch = useDispatch();
  const isCryptoReady = useCryptoReady();
  const isI18nReady = useSetupI18n().isI18nReady;
  useStoreBackgroundService();
  const { refetch } = useGetTokenConfigQuery(undefined, { pollingInterval: 300000 });

  // Enable lock screen on the start app
  useEffect(() => {
    // TODO FIXME
    // if (!firstTimeCheckPincode && isLocked) {
      // lock();
    // }
    // if (!isLocked) {
      unlockApp();
    // }
    firstTimeCheckPincode = true;
    autoLockParams.isMasterPasswordLocked = isLocked;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocked]);

  useEffect(() => {
    autoLockParams.lock = lock;
    autoLockParams.timeAutoLock = timeAutoLock;
    autoLockParams.hasMasterPassword = hasMasterPassword;
    // autoLockParams.isUseBiometric = isUseBiometric;
    autoLockParams.isPreventLock = isPreventLock;
  }, [timeAutoLock, isPreventLock, lock, hasMasterPassword]); // isUseBiometric

  const isRequiredStoresReady = true;

  // When update from v1.0.15, time auto lock could be wrong. We can remove this effect later
  useEffect(() => {
    if (!Object.values(LockTimeout).includes(timeAutoLock)) {
      dispatch(updateAutoLockTime(LockTimeout._15MINUTE));
    }
  }, [dispatch, timeAutoLock]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 100);

    refetch();
    if (buildNumber === 1) {
    // Set default value on the first time install
    const buildNumberInt = parseInt(getBuildNumber(), 10);
    // dispatch(setBuildNumber(buildNumberInt));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAppReady = isRequiredStoresReady && isCryptoReady && isI18nReady;

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <>
        <View style={{ flex: 1 }}>
          <ToastProvider
            duration={TOAST_DURATION}
            renderToast={toast => <CustomToast toast={toast} />}
            placement="top"
            normalColor={theme.colors.notification}
            textStyle={{ textAlign: 'center', ...FontMedium }}
            successColor={theme.colors.primary}
            warningColor={theme.colors.notification_warning}
            offsetTop={STATUS_BAR_HEIGHT + 40}
            dangerColor={theme.colors.notification_danger}>
            <ThemeContext.Provider value={theme}>
              <SigningContextProvider>
                <ExternalRequestContextProvider>
                  <QrSignerContextProvider>
                    <ScannerContextProvider>
                      <GestureHandlerRootView style={gestureRootStyle}>
                        <PortalProvider>
                          <AppModalContextProvider>
                            <AppNavigator isAppReady={isAppReady} />
                          </AppModalContextProvider>
                        </PortalProvider>
                      </GestureHandlerRootView>
                    </ScannerContextProvider>
                  </QrSignerContextProvider>
                </ExternalRequestContextProvider>
              </SigningContextProvider>
            </ThemeContext.Provider>
          </ToastProvider>
        </View>
        {!isAppReady && (
          <View style={layerScreenStyle}>
            <LoadingScreen />
          </View>
        )}
      </>
    </SafeAreaProvider>
  );
};

export default AppNew;