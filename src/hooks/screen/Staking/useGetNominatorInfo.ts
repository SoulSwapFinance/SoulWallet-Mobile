import { NominatorMetadata, StakingType } from '@soul-wallet/extension-base/src/background/KoniTypes';
import { isSameAddress } from '@soul-wallet/extension-base/src/utils';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';

export default function useGetNominatorInfo(chain?: string, type?: StakingType, address?: string): NominatorMetadata[] {
  const { nominatorMetadataList } = useSelector((state: RootState) => state.staking);

  return useMemo(() => {
    if (!chain && !type) {
      return [];
    }

    const result: NominatorMetadata[] = [];

    if (address) {
      nominatorMetadataList.forEach(nominatorMetadata => {
        if (
          nominatorMetadata.chain === chain &&
          nominatorMetadata.type === type &&
          isSameAddress(nominatorMetadata.address, address)
        ) {
          result.push(nominatorMetadata);
        }
      });
    } else {
      nominatorMetadataList.forEach(nominatorMetadata => {
        if (nominatorMetadata.chain === chain && nominatorMetadata.type === type) {
          result.push(nominatorMetadata);
        }
      });
    }

    return result;
  }, [address, chain, nominatorMetadataList, type]);
}
