import { ConfirmationContent } from 'components/Common/Confirmation';
import React from 'react';
import { SWTransactionResult } from '@soul-wallet/extension-base/src/services/transaction-service/types';
import { Text } from 'react-native';

export interface BaseTransactionConfirmationProps {
  transaction: SWTransactionResult;
}

export const BaseTransactionConfirmation: React.FC<BaseTransactionConfirmationProps> = ({
  transaction,
}: BaseTransactionConfirmationProps) => {
  return (
    <ConfirmationContent>
      <Text>{transaction.extrinsicType}</Text>
    </ConfirmationContent>
  );
};
