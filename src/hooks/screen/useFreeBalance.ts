// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';
import { cancelSubscription, subscribeFreeBalance } from 'messaging/index';

export default function useFreeBalance(
  networkKey: string | undefined | null,
  address: string | undefined | null,
  token: string | undefined | null,
): string {
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    let isSync = true;

    let id: string;

    if (address && networkKey) {
      (async () => {
        id = await subscribeFreeBalance({ networkKey, address, token: token || undefined }, free => {
          if (isSync) {
            setBalance(free);
          }
        });

        if (!isSync) {
          cancelSubscription(id).catch(e => console.log('Error when cancel subscription', e));
        }
      })().catch(console.log);
    }

    return () => {
      isSync = false;

      if (id) {
        cancelSubscription(id).catch(e => console.log('Error when cancel subscription', e));
      }

      setBalance('0');
    };
  }, [networkKey, address, token]);

  return balance;
}
