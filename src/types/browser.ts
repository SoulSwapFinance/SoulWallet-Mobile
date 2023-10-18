import { TagPropsType } from 'components/Design/Tag/PropsType';

export type DAPPCategory = {
  name: string;
  id: string;
  theme?: TagPropsType['color'];
};

export type DAppInfo = {
  name: string;
  id: string;
  url: string;
  icon: string;
  categories: string[];
  isSupportSubstrateAccount?: boolean;
  isSupportEthereumAccount?: boolean;
};

export type PredefinedDApps = {
  categories: () => DAPPCategory[];
  dapps: DAppInfo[];
};
