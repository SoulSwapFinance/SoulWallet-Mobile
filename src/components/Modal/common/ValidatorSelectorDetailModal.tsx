import React, { useCallback, useRef } from 'react';
import { SwModal } from 'components/Design';
import { View } from 'react-native';
import MetaInfo from 'components/MetaInfo';
import { ValidatorDataType } from 'hooks/screen/Staking/useGetValidatorList';
import i18n from 'utils/i18n/i18n';
import { SWModalRefProps } from 'components/Design/Modal/ModalBaseV2';
import { getValidatorLabel } from '@subwallet/extension-base/koni/api/staking/bonding/utils';

interface Props {
  detailModalVisible: boolean;
  detailItem: ValidatorDataType;
  networkPrefix?: number;
  setVisible: (arg: boolean) => void;
  chain: string;
}

export const ValidatorSelectorDetailModal = ({
  detailItem,
  detailModalVisible,
  networkPrefix,
  setVisible,
  chain,
}: Props) => {
  const {
    address: validatorAddress,
    commission,
    decimals,
    expectedReturn: earningEstimated = '',
    identity: validatorName = '',
    minBond: minStake,
    otherStake,
    ownStake,
    symbol,
    totalStake,
  } = detailItem;

  const modalBaseV2Ref = useRef<SWModalRefProps>(null);
  const onCancel = useCallback(() => modalBaseV2Ref?.current?.close(), []);

  return (
    <SwModal
      level={2}
      isUseModalV2
      modalBaseV2Ref={modalBaseV2Ref}
      setVisible={setVisible}
      modalVisible={detailModalVisible}
      modalTitle={i18n.formatString(i18n.common.stakingValidatorDetail, getValidatorLabel(chain)) as string}
      onBackButtonPress={onCancel}>
      <View style={{ width: '100%' }}>
        <MetaInfo hasBackgroundWrapper>
          <MetaInfo.Account
            label={getValidatorLabel(chain)}
            address={validatorAddress}
            name={validatorName}
            networkPrefix={networkPrefix}
          />
          <MetaInfo.Number
            decimals={decimals}
            label={i18n.inputLabel.minStakeRequire}
            suffix={symbol}
            value={minStake}
            valueColorSchema={'even-odd'}
          />
          {totalStake !== '0' && (
            <MetaInfo.Number
              decimals={decimals}
              label={i18n.inputLabel.totalStake}
              suffix={symbol}
              value={totalStake}
              valueColorSchema={'even-odd'}
            />
          )}

          {ownStake !== '0' && (
            <MetaInfo.Number
              decimals={decimals}
              label={i18n.inputLabel.ownStake}
              suffix={symbol}
              value={ownStake}
              valueColorSchema={'even-odd'}
            />
          )}
          {otherStake !== '0' && (
            <MetaInfo.Number
              decimals={decimals}
              label={i18n.inputLabel.stakeFromOthers}
              suffix={symbol}
              value={otherStake}
              valueColorSchema={'even-odd'}
            />
          )}

          {Number(earningEstimated) > 0 && earningEstimated !== '' && (
            <MetaInfo.Number
              label={i18n.inputLabel.estimatedApy}
              suffix={'%'}
              value={earningEstimated}
              valueColorSchema={'even-odd'}
            />
          )}
          <MetaInfo.Number
            label={i18n.inputLabel.commission}
            suffix={'%'}
            value={commission}
            valueColorSchema={'even-odd'}
          />
        </MetaInfo>
      </View>
    </SwModal>
  );
};
