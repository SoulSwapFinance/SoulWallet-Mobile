import { CronServiceType, SubscriptionServiceType } from '@soul-wallet/extension-base/src/background/KoniTypes';

export type DelayBackgroundService = 'crowdloan' | 'staking' | 'nft';

// todo: remove these types below after extension-koni-base export them

export interface RequestCronAndSubscriptionAction {
  subscriptionServices: SubscriptionServiceType[];
  cronServices: CronServiceType[];
}
