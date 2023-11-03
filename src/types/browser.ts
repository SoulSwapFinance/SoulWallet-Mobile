import { TagPropsType } from 'components/Design/Tag/PropsType';

export type DAPPCategory = {
  name: string;
  id: string;
  color?: string;
  theme?: TagPropsType['color'];
  slug?: string
};

export type DAppInfo = {
  name: string;
  id: string;
  url: string;
  icon: string;
  categories: string[];
  title?: string
  isFeatured?: boolean
  previewImage?: string
  isSupportSubstrateAccount?: boolean;
  isSupportEthereumAccount?: boolean;
};

export type PredefinedDApps = {
  categories: () => DAPPCategory[];
  dapps: DAppInfo[];
};
