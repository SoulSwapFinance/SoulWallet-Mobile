import { TagPropsType } from 'components/Design/Tag/PropsType';

export type DAPPCategory = {
  name: string;
  id: string;
  slug?: string;
  color?: TagPropsType['color'];
  theme?: string;
};

export type DAppInfo = {
  id: string;
  title?: string;
  subtitle?: string;
  url: string;
  description?: string;
  categories: string[];
  chain: string[];
  is_featured: boolean;
  is_evm: boolean;
  is_substrate: boolean;
  icon: string;
  preview_image: string;
  // V1
  name: string;
};

export type PredefinedDApps = {
  categories: () => DAPPCategory[];
  dapps: DAppInfo[];
};
