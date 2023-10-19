import { _ChainAsset } from '@soul-wallet/chain-list/build/types';
import { AssetSetting } from '@subwallet/extension-base/background/KoniTypes';
import { _ChainState } from '@subwallet/extension-base/services/chain-service/types';
import { _isAssetFungibleToken } from '@subwallet/extension-base/services/chain-service/utils';

export function isTokenAvailable(
  chainAsset: _ChainAsset,
  assetSettingMap: Record<string, AssetSetting>,
  chainStateMap: Record<string, _ChainState>,
  filterActiveChain: boolean,
  ledgerNetwork?: string,
): boolean {
  const assetSetting = assetSettingMap[chainAsset.slug];

  const isAssetVisible = assetSetting && assetSetting.visible;
  const isAssetFungible = _isAssetFungibleToken(chainAsset);
  const isOriginChainActive = chainStateMap[chainAsset.originChain]?.active;
  const isValidLedger = ledgerNetwork ? ledgerNetwork === chainAsset.originChain : true; // Check if have ledger network

  if (filterActiveChain) {
    return isAssetVisible && isAssetFungible && isOriginChainActive && isValidLedger;
  }

  return isAssetVisible && isAssetFungible && isValidLedger;
}
