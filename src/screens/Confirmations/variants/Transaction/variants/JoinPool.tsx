import { ConfirmationContent } from 'components/Common/Confirmation';
import React from 'react';
import { CommonTransactionInfo } from 'components/Common/Confirmation/CommonTransactionInfo';
import { BaseTransactionConfirmationProps } from 'screens/Confirmations/variants/Transaction/variants/Base';
import { RequestStakePoolingBonding } from '@soul-wallet/extension-base/src/background/KoniTypes';
import useGetNativeTokenBasicInfo from 'hooks/useGetNativeTokenBasicInfo';
import MetaInfo from 'components/MetaInfo';
import i18n from 'utils/i18n/i18n';

type Props = BaseTransactionConfirmationProps;

const StakeTransactionConfirmation = ({ transaction }: Props) => {
  const data = transaction.data as RequestStakePoolingBonding;
  const { decimals, symbol } = useGetNativeTokenBasicInfo(transaction.chain);

  return (
    <ConfirmationContent isFullHeight>
      <CommonTransactionInfo address={transaction.address} network={transaction.chain} />

      <MetaInfo style={{ marginTop: 12 }} hasBackgroundWrapper>
        <MetaInfo.Number decimals={decimals} label={i18n.inputLabel.amount} suffix={symbol} value={data.amount} />
        <MetaInfo.Number
          decimals={decimals}
          label={i18n.inputLabel.estimatedFee}
          suffix={symbol}
          value={transaction.estimateFee?.value || 0}
        />
      </MetaInfo>
    </ConfirmationContent>
  );
};

export default StakeTransactionConfirmation;
