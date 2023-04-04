import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Warning } from 'components/Warning';
import { SubWalletFullSizeModal } from 'components/Modal/Base/SubWalletFullSizeModal';
import i18n from 'utils/i18n/i18n';
import { FlatListScreen } from 'components/FlatListScreen';
import { FlatListScreenPaddingTop } from 'styles/sharedStyles';
import { _ChainAsset } from '@subwallet/chain-list/types';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { TokenSelectItem } from 'components/TokenSelectItem';

interface Props {
  modalVisible: boolean;
  onCancel: () => void;
  onSelectItem: (item: _ChainAsset) => void;
  items: _ChainAsset[];
  title?: string;
}

const filterFunction = (items: _ChainAsset[], searchString: string) => {
  const lowerCaseSearchString = searchString.toLowerCase();
  return items.filter(({ name }) => name.toLowerCase().includes(lowerCaseSearchString));
};

const renderListEmptyComponent = () => {
  return (
    <Warning
      style={{ marginHorizontal: 16 }}
      title={i18n.warningTitle.warning}
      message={i18n.warningMessage.noTokenAvailable}
      isDanger={false}
    />
  );
};

export const TokenSelector = ({ modalVisible, onCancel, onSelectItem, items, title = i18n.title.token }: Props) => {
  const chainInfoMap = useSelector((state: RootState) => state.chainStore.chainInfoMap);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<_ChainAsset>) => {
      const { symbol, name, originChain } = item;

      return (
        <TokenSelectItem
          key={`${symbol}-${originChain}`}
          itemName={`${name} (${chainInfoMap[originChain]?.name || ''})`}
          logoKey={symbol.toLowerCase()}
          subLogoKey={originChain}
          isSelected={false}
          onSelectNetwork={() => onSelectItem(item)}
        />
      );
    },
    [chainInfoMap, onSelectItem],
  );

  return (
    <SubWalletFullSizeModal modalVisible={modalVisible} onChangeModalVisible={onCancel}>
      <FlatListScreen
        autoFocus={true}
        items={items}
        style={FlatListScreenPaddingTop}
        title={title}
        searchFunction={filterFunction}
        renderItem={renderItem}
        onPressBack={onCancel}
        renderListEmptyComponent={renderListEmptyComponent}
      />
    </SubWalletFullSizeModal>
  );
};
