import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Linking, View } from 'react-native';
import { ArrowSquareUpRight, IconProps, Star, StarHalf } from 'phosphor-react-native';
import { SiteInfo } from 'stores/types';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { addBookmark, removeBookmark } from 'stores/updater';
import i18n from 'utils/i18n/i18n';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import { SelectItem, SwModal } from 'components/Design';
import { searchDomain } from 'utils/browser';
import { SWModalRefProps } from 'components/Design/Modal/ModalBaseV2';

interface Props {
  visibleModal: boolean;
  setVisibleModal: (arg: boolean) => void;
}

interface OptionType {
  key: string;
  icon: React.ElementType<IconProps>;
  label: string;
  onPress: () => void;
  iconBackgroundColor: string;
}

export interface BrowserOptionModalRef {
  onUpdateSiteInfo: (siteInfo: SiteInfo) => void;
}

const Component = ({ visibleModal, setVisibleModal }: Props, ref: ForwardedRef<BrowserOptionModalRef>) => {
  const theme = useSoulWalletTheme().swThemes;
  const bookmarks = useSelector((state: RootState) => state.browser.bookmarks);
  const modalRef = useRef<SWModalRefProps>(null);

  const onClose = () => modalRef?.current?.close();

  const [siteInfo, setSiteInfo] = useState<SiteInfo>({
    url: '',
    name: '',
  });
  const isBookmarked = bookmarks.some(b => b.url === siteInfo.url);

  useImperativeHandle(ref, () => ({
    onUpdateSiteInfo: (_siteInfo: SiteInfo) => {
      setSiteInfo(_siteInfo);
    },
  }));

  const OPTIONS: OptionType[] = [
    {
      key: 'toggleFavoriteSite',
      icon: isBookmarked ? StarHalf : Star,
      label: isBookmarked ? i18n.common.removeBookmark : i18n.common.addBookmark,
      iconBackgroundColor: isBookmarked ? theme.colorTextDarkPurple : theme.colorTextDarkPurple,
      onPress: () => {
        if (isBookmarked) {
          removeBookmark(siteInfo);
        } else {
          addBookmark(siteInfo);
        }
        onClose();
      },
    },
    {
      key: 'openInBrowser',
      icon: ArrowSquareUpRight,
      label: i18n.common.openInBrowser,
      iconBackgroundColor: theme.colorTextDarkPurple,
      onPress: () => {
        if (siteInfo.url) {
          Linking.canOpenURL(siteInfo.url).then(() => Linking.openURL(siteInfo.url));
        }

        onClose();
      },
    },
  ];

  return (
    <SwModal
      isUseModalV2={true}
      modalBaseV2Ref={modalRef}
      setVisible={setVisibleModal}
      modalVisible={visibleModal}
      modalTitle={i18n.title.moreOptions}
      onBackButtonPress={onClose}>
      <View style={{ width: '100%', gap: 8 }}>
        {OPTIONS.map(opt => (
          <SelectItem
            onPress={opt.onPress}
            icon={opt.icon}
            key={opt.key}
            label={opt.label}
            isSelected={false}
            disabled={opt.key === 'toggleFavoriteSite' && siteInfo.url.startsWith(`https://${searchDomain}`)}
            backgroundColor={opt.iconBackgroundColor}
          />
        ))}
      </View>
    </SwModal>
  );
};

export const BrowserOptionModal = forwardRef(Component);
