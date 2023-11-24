import { NavigationState } from '@react-navigation/routers';
import { ALL_ACCOUNT_KEY } from '@soul-wallet/extension-base/src/constants';
import React, { ComponentType, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { LinkingOptions, NavigationContainer, StackActions, useNavigationContainerRef } from '@react-navigation/native';
import AttachReadOnly from 'screens/Account/AttachReadOnly';
import ConnectKeystone from 'screens/Account/ConnectQrSigner/ConnectKeystone';
import ConnectParitySigner from 'screens/Account/ConnectQrSigner/ConnectParitySigner';
import ImportQrCode from 'screens/Account/ImportQrCode';
import { NetworksSetting } from 'screens/NetworksSetting';
import { GeneralSettings } from 'screens/Settings/General';
import { SendFund } from 'screens/Transaction/SendFundV2';
import { BrowserSearch } from 'screens/Home/Browser/BrowserSearch';
import { BrowserTabsManager } from 'screens/Home/Browser/BrowserTabsManager';
import { BrowserListByTabview } from 'screens/Home/Browser/BrowserListByTabview';
import { AccountsScreen } from 'screens/Account/AccountsScreen';
import CreateMasterPassword from 'screens/MasterPassword/CreateMasterPassword';
import { CreateAccount } from 'screens/Account/CreateAccount';
import { AccountDetail } from 'screens/Account/AccountDetail';
import { RestoreJson } from 'screens/Account/RestoreJson';
import { ImportSecretPhrase } from 'screens/Account/ImportSecretPhrase';
import { ImportPrivateKey } from 'screens/Account/ImportPrivateKey';
import { DAppAccessScreen } from 'screens/Settings/Security/DAppAccess';
import { DAppAccessDetailScreen } from 'screens/Settings/Security/DAppAccess/DAppAccessDetailScreen';
import { Languages } from 'screens/Settings/Languages';
import { Security } from 'screens/Settings/Security';
import { AccountExport } from 'screens/Account/AccountExport';
import { CustomTokenSetting } from 'screens/Tokens';
import { NetworkConfig } from 'screens/Settings/NetworkConfig';
import { NetworkConfigDetail } from 'screens/Settings/NetworkConfigDetail';
import { ConfigureToken } from 'screens/Tokens/ConfigureToken';
import { ImportToken } from 'screens/ImportToken/ImportToken';
import ImportNft from 'screens/ImportToken/ImportNft';
import NftCollectionList from 'screens/Home/Crypto/Collectibles/Collection/NftCollectionList'
import NftCollectionItem from 'screens/Home/Crypto/Collectibles/Collection/NftCollectionItem'
import NftDetail from 'screens/Home/Crypto/Collectibles/Detail/NftDetail'
import { WebViewDebugger } from 'screens/WebViewDebugger';
import SigningScreen from 'screens/Signing/SigningScreen';
import { LoadingScreen } from 'screens/LoadingScreen';
import { RootRouteProps, RootStackParamList } from './routes';
import { THEME_PRESET } from 'styles/themes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { deeplinks, getValidURL } from 'utils/browser';
import ErrorBoundary from 'react-native-error-boundary';
import ApplyMasterPassword from 'screens/MasterPassword/ApplyMasterPassword';
import { NetworkSettingDetail } from 'screens/NetworkSettingDetail';
import { Confirmations } from 'screens/Confirmations';
import { TransactionDone } from 'screens/Transaction';
import ErrorFallback from 'components/Common/ErrorFallbackScreen';
import ChangeMasterPassword from 'screens/MasterPassword/ChangeMasterPassword';
import { ImportNetwork } from 'screens/ImportNetwork';
import History from 'screens/Home/History';
import withPageWrapper from 'components/PageWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { AddProvider } from 'screens/AddProvider';
import TransactionScreen from 'screens/Transaction/TransactionScreen';
import SendNFT from 'screens/Transaction/NFT';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { Keyboard, Linking, Platform, StatusBar } from 'react-native';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import { AppNavigatorDeepLinkStatus, Home } from 'screens/Home';
import { deviceWidth } from 'constants/index';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Settings } from 'screens/Settings';
import { WrapperParamList } from 'routes/wrapper';
import { ManageAddressBook } from 'screens/Settings/AddressBook';
import { BuyToken } from 'screens/Home/Crypto/BuyToken';
import useCheckEmptyAccounts from 'hooks/useCheckEmptyAccounts';
import { ConnectionList } from 'screens/Settings/WalletConnect/ConnectionList';
import { ConnectWalletConnect } from 'screens/Settings/WalletConnect/ConnectWalletConnect';
import { ConnectionDetail } from 'screens/Settings/WalletConnect/ConnectionDetail';
import useAppLock from 'hooks/useAppLock';
// import LoginScreen from 'screens/MasterPassword/Login';
import { STATUS_BAR_LIGHT_CONTENT } from 'styles/sharedStyles';
import { UnlockModal } from 'components/Common/Modal/UnlockModal';
import { AppModalContext } from 'providers/AppModalContext';
import { PortalHost } from '@gorhom/portal';
import { findAccountByAddress } from 'utils/index';
import { CurrentAccountInfo } from '@subwallet/extension-base/background/KoniTypes';
import { saveCurrentAccountAddress, updateAssetSetting } from 'messaging/index';
import urlParse from 'url-parse';
import useChainChecker from 'hooks/chain/useChainChecker';
import { transformUniversalToNative } from 'utils/deeplink';
import { setPrevDeeplinkUrl } from './AppNew';
import { updateIsDeepLinkConnect } from 'stores/base/Settings';
import queryString from 'querystring';
import { connectWalletConnect } from 'utils/walletConnect';
import { useToast } from 'react-native-toast-notifications';

interface Props {
  isAppReady: boolean;
}

const config: LinkingOptions<RootStackParamList>['config'] = {
  screens: {
    BrowserTabsManager: {
      path: 'browser',
      parse: {
        url: url => {
          try {
            return getValidURL(decodeURIComponent(url));
          } catch (e) {
            console.warn('Cannot decode url ' + url);
            return getValidURL(url);
          }
        },
        name: name => name || '',
      },
      stringify: {
        url: url => url,
        name: name => name || '',
      },
    },
    Home: {
      path: 'home',
      screens: {
        // @ts-ignore
        Main: {
          path: 'main',
          screens: {
            Tokens: {
              path: 'tokens',
              initialRouteName: 'TokenGroups',
              screens: {
                TokenGroupsDetail: {
                  path: 'token-groups-detail',
                  stringify: {
                    address: (address: string) => address,
                    slug: (slug: string) => slug,
                  },
                },
              },
            },
            NFTs: {
              path: 'nfts',
              screens: {
                Collection: {
                  path: 'collection',
                  stringify: {
                    collectionId: (collectionId: string) => collectionId,
                  },
                },
                NftDetail: {
                  path: 'nft-detail',
                  stringify: {
                    collectionId: (collectionId: string) => collectionId,
                    nftId: (nftId: string) => nftId,
                  },
                },
              },
            },
            Crowdloans: {
              path: 'crowdloans',
            },
            Staking: {
              path: 'staking',
              screens: {
                StakingBalances: {
                  path: 'staking-balances',
                  stringify: {
                    chain: (chain: string) => chain,
                    type: (type: string) => type,
                  },
                },
              },
            },
            // SoulSwap: {
            //   path: 'soulswap',
            // },
            // Portfolios: {
            //   path: 'portfolios',
            // },
            // Markets: {
            //   path: 'markets',
            // },
            Browser: {
              path: 'browser-home',
            },
          },
        },
      },
    },
  },
};

const getSettingsContent = (props: DrawerContentComponentProps) => {
  return <Settings {...props} />;
};

const DrawerScreen = () => {
  const Drawer = createDrawerNavigator<WrapperParamList>();
  return (
    <Drawer.Navigator
      initialRouteName={'TransactionAction'}
      drawerContent={getSettingsContent}
      screenOptions={{
        drawerStyle: {
          width: deviceWidth,
        },
        drawerType: 'front',
        headerShown: false,
        swipeEnabled: false,
      }}>
      <Drawer.Screen name="TransactionAction" component={TransactionScreen} />
      <Drawer.Screen name="BuyToken" component={BuyToken} />
    </Drawer.Navigator>
  );
};

const HistoryScreen = (props: JSX.IntrinsicAttributes) => {
  return withPageWrapper(History as ComponentType, ['transactionHistory'])(props);
};

const ConnectionListScreen = (props: JSX.IntrinsicAttributes) => {
  return withPageWrapper(ConnectionList as ComponentType, ['walletConnect'])(props);
};

type DeepLinkSubscriptionType = {
  url: string;
};

const AppNavigator = ({ isAppReady }: Props) => {
  const isDarkMode = true;
  const theme = isDarkMode ? THEME_PRESET.dark : THEME_PRESET.light;
  const appTheme = useSoulWalletTheme().swThemes;
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const [currentRoute, setCurrentRoute] = useState<RootRouteProps | undefined>(undefined);
  const isEmptyAccounts = useCheckEmptyAccounts();
  const { hasConfirmations } = useSelector((state: RootState) => state.requestState);
  const { accounts, hasMasterPassword, isReady, isLocked } = useSelector((state: RootState) => state.accountState);
  const { isLocked: isLogin } = useAppLock();
  const [isNavigationReady, setNavigationReady] = useState<boolean>(false);
  const appModalContext = useContext(AppModalContext);
  const isLockedRef = useRef(isLogin);
  const { checkChainConnected } = useChainChecker();
  const toast = useToast();
  const dispatch = useDispatch();
  const appNavigatorDeepLinkStatus = useRef<AppNavigatorDeepLinkStatus>(AppNavigatorDeepLinkStatus.AVAILABLE);
  const finishLoginProgressRef = useRef<Function | null>(null);
  const waitForLoginProcessRef = useRef<Promise<boolean> | null>(null);
  const isPreventDeepLinkRef = useRef(isEmptyAccounts || !hasMasterPassword || hasConfirmations);

  useEffect(() => {
    if (!isLocked && finishLoginProgressRef.current) {
      finishLoginProgressRef.current(!isLocked);
      finishLoginProgressRef.current = null;
    }
    if (isLocked) {
      waitForLoginProcessRef.current = null;
      finishLoginProgressRef.current = null;
    }
  }, [isLocked]);

  useEffect(() => {
    if (isReady) {
      const unsubscribe = Linking.addEventListener('url', ({ url }) => {
        const _url = transformUniversalToNative(url);
        if (isPreventDeepLinkRef.current) {
          return;
        }
        if (appNavigatorDeepLinkStatus.current === AppNavigatorDeepLinkStatus.BLOCK) {
          appNavigatorDeepLinkStatus.current = AppNavigatorDeepLinkStatus.RESET;
        }
        const urlParsed = new urlParse(_url);
        setPrevDeeplinkUrl('');

        if (urlParsed.hostname === 'wc') {
          dispatch(updateIsDeepLinkConnect(true));
          if (urlParsed.query.startsWith('?requestId')) {
            return;
          }
          const decodedWcUrl = queryString.decode(urlParsed.query.slice(5));
          const finalWcUrl = Object.keys(decodedWcUrl)[0];
          connectWalletConnect(finalWcUrl, toast);
        }

        if (appNavigatorDeepLinkStatus.current === AppNavigatorDeepLinkStatus.AVAILABLE) {
          waitForLoginProcessRef.current = new Promise(resolve => {
            finishLoginProgressRef.current = resolve;
          });
          (async () => {
            await waitForLoginProcessRef.current;
            Linking.openURL(_url);
            appNavigatorDeepLinkStatus.current = AppNavigatorDeepLinkStatus.BLOCK;
            waitForLoginProcessRef.current = null;
            finishLoginProgressRef.current = null;
          })();
        }
        if (appNavigatorDeepLinkStatus.current === AppNavigatorDeepLinkStatus.RESET) {
          appNavigatorDeepLinkStatus.current = AppNavigatorDeepLinkStatus.AVAILABLE;
        }
      });
      return () => unsubscribe.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  useEffect(() => {
    isLockedRef.current = isLogin;
  }, [isLogin]);

  useEffect(() => {
    isPreventDeepLinkRef.current = isEmptyAccounts || !hasMasterPassword || hasConfirmations;
  }, [hasConfirmations, hasMasterPassword, isEmptyAccounts]);

  const needMigrate = useMemo(
    () =>
      !!accounts.filter(acc => acc.address !== ALL_ACCOUNT_KEY && !acc.isExternal).filter(acc => !acc.isMasterPassword)
        .length,
    [accounts],
  );
  const needMigrateMasterPassword = needMigrate && hasMasterPassword && currentRoute;

  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: deeplinks,
    config,
    async getInitialURL() {
      return null;
    },
    subscribe: listener => {
      const onReceiveURL = ({ url }: DeepLinkSubscriptionType) => {
        const parseUrl = new urlParse(url);
        const urlQuery = parseUrl.query.substring(1);
        const urlQueryMap: Record<string, string> = {};
        urlQuery.split('&').forEach(item => {
          const splitItem = item.split('=');
          urlQueryMap[splitItem[0]] = splitItem[1];
        });

        const accountByAddress = findAccountByAddress(accounts, urlQueryMap.address);
        //change account follow url
        if (accountByAddress) {
          const accountInfo = {
            address: urlQueryMap.address,
          } as CurrentAccountInfo;

          saveCurrentAccountAddress(accountInfo).catch(e => {
            console.error('There is a problem when set Current Account', e);
          });
        } else {
          saveCurrentAccountAddress({ address: 'ALL' }).catch(e => {
            console.error('There is a problem when set Current Account', e);
          });
        }
        //enable Network
        const originChain = urlQueryMap.slug ? urlQueryMap.slug.split('-')[1].toLowerCase() : '';
        const isChainConnected = checkChainConnected(originChain);

        if (!isChainConnected && originChain) {
          updateAssetSetting({
            tokenSlug: urlQueryMap.slug,
            assetSetting: {
              visible: true,
            },
            autoEnableNativeToken: true,
          });
        }
        if (isLockedRef.current || isPreventDeepLinkRef.current) {
          return;
        }
        listener(url);
      };
      const linkingListener = Linking.addEventListener('url', onReceiveURL);

      return () => linkingListener.remove();
    },
  };

  const onError = (error: Error, stackTrace: string) => {
    console.warn('AppNavigator.tsx / Error boundary: ', error, stackTrace);
  };

  const onUpdateRoute = useCallback((state: NavigationState | undefined) => {
    setCurrentRoute(state?.routes[state?.index]);
  }, []);

  useEffect(() => {
    let amount = true;
    if (hasConfirmations && currentRoute && amount) {
      if (currentRoute.name !== 'Confirmations' && amount) {
        if (
          !['CreateAccount', 'CreatePassword', 'Login', 'UnlockModal'].includes(currentRoute.name) &&
          !isLogin &&
          amount
        ) {
          Keyboard.dismiss();
          navigationRef.current?.navigate('Confirmations');
        }
      }
    }

    return () => {
      amount = false;
    };
  }, [hasConfirmations, navigationRef, currentRoute, isLogin]);

  useEffect(() => {
    if (needMigrateMasterPassword && !isLogin) {
      if (!['MigratePassword', 'UnlockModal', 'Login'].includes(currentRoute.name)) {
        navigationRef.current?.reset({
          index: 1,
          routes: [{ name: 'Home' }, { name: 'MigratePassword' }],
        });
      }
    }
  }, [currentRoute, isLogin, navigationRef, needMigrateMasterPassword]);

  useEffect(() => {
    if (isLogin && !!accounts.length && isNavigationReady) {
      appModalContext.hideConfirmModal();
      if (currentRoute && currentRoute.name === 'Confirmations') {
        setTimeout(() => navigationRef.current?.dispatch(StackActions.replace('Login')), 300);
      } else {
        setTimeout(() => navigationRef.current?.navigate('Login'), 300);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, isNavigationReady, accounts, currentRoute]);

  useEffect(() => {
    if (isEmptyAccounts) {
      navigationRef.current?.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, [isEmptyAccounts, navigationRef]);

  const onNavigationReady = () => {
    setNavigationReady(true);
  };

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      theme={theme}
      onStateChange={onUpdateRoute}
      onReady={onNavigationReady}>
      <StatusBar barStyle={STATUS_BAR_LIGHT_CONTENT} translucent={true} backgroundColor={'transparent'} />
      <PortalHost name="ConfirmationModalHost" />
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
        <Stack.Navigator
          screenOptions={{
            animation: 'fade',
          }}
          screenListeners={{
            focus: e => {
              if (Platform.OS === 'android') {
                if (e.target?.split('-')[0] === 'Home') {
                  changeNavigationBarColor(appTheme.colorBgSecondary);
                } else {
                  changeNavigationBarColor(appTheme.colorBgDefault);
                }
              }
            },
          }}>
          {isAppReady && (
            <>
              <Stack.Group screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="GeneralSettings" component={GeneralSettings} />
                <Stack.Screen name="SendFund" component={SendFund} options={{ gestureEnabled: false }} />
                <Stack.Screen name="SendNFT" component={SendNFT} options={{ gestureEnabled: false }} />
                <Stack.Screen name="BrowserSearch" component={BrowserSearch} />
                <Stack.Screen name="BrowserTabsManager" component={BrowserTabsManager} />
                <Stack.Screen name="BrowserListByTabview" component={BrowserListByTabview} />
                <Stack.Screen name="AccountsScreen" component={AccountsScreen} />
                <Stack.Screen name="Drawer" component={DrawerScreen} options={{ gestureEnabled: false }} />
              </Stack.Group>
              <Stack.Group screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
                <Stack.Screen name="History" component={HistoryScreen} />
                <Stack.Screen name="NetworksSetting" component={NetworksSetting} />
                <Stack.Screen name="ConnectList" component={ConnectionListScreen} />
                <Stack.Screen name="ConnectDetail" component={ConnectionDetail} />
                <Stack.Screen name="ConnectWalletConnect" component={ConnectWalletConnect} />
                <Stack.Screen
                  name="CreatePassword"
                  component={CreateMasterPassword}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen name="ManageAddressBook" component={ManageAddressBook} />
                <Stack.Screen name="NetworkSettingDetail" component={NetworkSettingDetail} />
                <Stack.Screen name="ImportNetwork" component={ImportNetwork} options={{ gestureEnabled: false }} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
                <Stack.Screen
                  name="MigratePassword"
                  component={ApplyMasterPassword}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen name="AddProvider" component={AddProvider} />
                <Stack.Screen name="EditAccount" component={AccountDetail} />
                <Stack.Screen name="RestoreJson" component={RestoreJson} options={{ gestureEnabled: false }} />
                <Stack.Screen
                  name="ImportSecretPhrase"
                  component={ImportSecretPhrase}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen
                  name="ImportPrivateKey"
                  component={ImportPrivateKey}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen name="DAppAccess" component={DAppAccessScreen} />
                <Stack.Screen name="DAppAccessDetail" component={DAppAccessDetailScreen} />
                <Stack.Screen name="Languages" component={Languages} />
                <Stack.Screen name="Security" component={Security} />
                <Stack.Screen
                  name="ChangePassword"
                  component={ChangeMasterPassword}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen name="AccountExport" component={AccountExport} />
                <Stack.Screen name="CustomTokenSetting" component={CustomTokenSetting} />
                <Stack.Screen name="NetworkConfig" component={NetworkConfig} />
                <Stack.Screen name="NetworkConfigDetail" component={NetworkConfigDetail} />
                <Stack.Screen name="ConfigureToken" component={ConfigureToken} />
                <Stack.Screen name="ImportToken" component={ImportToken} options={{ gestureEnabled: false }} />
                <Stack.Screen name="ImportNft" component={ImportNft} options={{ gestureEnabled: false }} />
                <Stack.Screen name="CollectionList" component={NftCollectionList} options={{ gestureEnabled: false }} />
                <Stack.Screen name="CollectionItem" component={NftCollectionItem} options={{ gestureEnabled: false }} />
                <Stack.Screen name="NftDetail" component={NftDetail} options={{ gestureEnabled: false }} />
                <Stack.Screen name="WebViewDebugger" component={WebViewDebugger} />
                <Stack.Screen name="SigningAction" component={SigningScreen} options={{ gestureEnabled: false }} />
                <Stack.Screen name="TransactionDone" component={TransactionDone} options={{ gestureEnabled: false }} />
                <Stack.Screen name="ConnectParitySigner" component={ConnectParitySigner} />
                <Stack.Screen name="ConnectKeystone" component={ConnectKeystone} />
                <Stack.Screen name="AttachReadOnly" component={AttachReadOnly} options={{ gestureEnabled: false }} />
                <Stack.Screen name="ImportQrCode" component={ImportQrCode} />
              </Stack.Group>
              <Stack.Group
                screenOptions={{
                  presentation: 'transparentModal',
                  contentStyle: { backgroundColor: theme.swThemes.colorBgMask },
                  headerShown: false,
                }}>
                <Stack.Screen
                  name="Confirmations"
                  component={Confirmations}
                  options={{ gestureEnabled: false, animationDuration: 100 }}
                />
                {/* {!!accounts.length && <Stack.Screen name="Login" component={LoginScreen} />} */}
                <Stack.Screen name={'UnlockModal'} component={UnlockModal} />
              </Stack.Group>
            </>
          )}
          {!isAppReady && <Stack.Screen name="LoadingScreen" component={LoadingScreen} />}
        </Stack.Navigator>
        <PortalHost name="SimpleModalHost" />
      </ErrorBoundary>
    </NavigationContainer>
  );
};

export default AppNavigator;