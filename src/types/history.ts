import { TransactionHistoryItem } from '@subwallet/extension-base/background/KoniTypes';
import { SWIconProps } from 'components/Design/Icon';

export interface TransactionHistoryDisplayData {
  className: string;
  typeName: string;
  name: string;
  title: string;
  icon: SWIconProps['phosphorIcon'];
}
export interface TransactionHistoryDisplayItem extends TransactionHistoryItem {
  displayData: TransactionHistoryDisplayData;
}
