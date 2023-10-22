import { StoreStatus } from 'stores/types';
import { useContext, useEffect, useState } from 'react';
import { WebRunnerContext } from 'providers/contexts';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { CustomTokenJson } from '@soul-wallet/extension-base/src/background/KoniTypes';
import { updateCustomToken } from 'stores/updater';
import { clearWebRunnerHandler, subscribeCustomToken } from 'messaging/index';
import { getId } from '@soul-wallet/extension-base/src/utils/getId';

export default function useStoreCustomToken(): StoreStatus {
  const isWebRunnerReady = useContext(WebRunnerContext).isReady;
  const isCached = useSelector((state: RootState) => state.customToken.isReady);
  const [storeStatus, setStoreStatus] = useState<StoreStatus>(isCached ? 'CACHED' : 'INIT');

  useEffect(() => {
    let cancel = false;
    const handlerId = getId();

    if (isWebRunnerReady) {
      console.log('--- Setup redux: customToken');

      const _update = (payload: CustomTokenJson) => {
        if (cancel) {
          return;
        }
        console.log('--- subscribeCustomToken updated');
        updateCustomToken(payload);
        setStoreStatus('SYNCED');
      };

      subscribeCustomToken(_update, handlerId)
        .then(_update)
        .catch(e => {
          console.log('--- subscribeCustomToken error:', e);
        });
    }

    return () => {
      cancel = true;
      clearWebRunnerHandler(handlerId);
    };
  }, [isWebRunnerReady]);

  return storeStatus;
}
