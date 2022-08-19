import { useContext, useEffect, useState } from 'react';
import { subscribeChainRegistry } from '../../messaging';
import { updateChainRegistry } from 'stores/updater';
import { ChainRegistry } from '@subwallet/extension-base/background/KoniTypes';
import { WebRunnerContext } from 'providers/contexts';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { StoreStatus } from 'stores/types';

export default function useStoreChainRegistry(): StoreStatus {
  const isWebRunnerReady = useContext(WebRunnerContext).isReady;
  const isCached = useSelector((state: RootState) => state.chainRegistry.isReady);
  const [storeStatus, setStoreStatus] = useState<StoreStatus>(isCached ? 'CACHED' : 'INIT');

  useEffect(() => {
    let cancel = false;

    if (isWebRunnerReady) {
      console.log('--- Setup redux: chainRegistry');

      const _update = (payload: Record<string, ChainRegistry>) => {
        if (cancel) {
          return;
        }

        if (storeStatus === 'CACHED' && Object.keys(payload).length === 0) {
          return;
        }
        console.log('--- subscribeChainRegistry updated');

        updateChainRegistry(payload);
        setStoreStatus('SYNCED');
      };
      subscribeChainRegistry(_update)
        .then(_update)
        .catch(e => {
          console.log('--- subscribeChainRegistry error:', e);
        });
    }

    return () => {
      cancel = true;
    };
  }, [isWebRunnerReady, storeStatus]);

  return storeStatus;
}
