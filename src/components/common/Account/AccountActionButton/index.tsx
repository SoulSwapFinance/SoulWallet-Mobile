import React from 'react';
import Button from '../../../Design/button';
import { View } from 'react-native';
import Text from 'components/Text';
import { IconProps } from 'phosphor-react-native';
import Icon from '../../../Design/icon';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import AccountActionButtonStyles from './style';

type AccountActionButtonType = {
  key: string;
  icon: React.ElementType<IconProps>;
  title: string;
  subTitle: string;
  onPress: () => void;
};

interface Props {
  item: AccountActionButtonType;
}

const AccountActionButton = ({ item }: Props) => {
  const theme = useSoulWalletTheme().swThemes;
  const _style = AccountActionButtonStyles(theme);

  return (
    <Button
      size={'xl'}
      type={'secondary'}
      // type={item.key === 'create' ? 'primary' : 'secondary'}
      icon={
        <View style={{ paddingLeft: 8, paddingRight: 24 }}>
          <Icon phosphorIcon={item.icon} weight={'fill'} />
        </View>
      }
      onPress={item.onPress}
      style={{ marginBottom: 8 }}
      contentAlign={'left'}
      >
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={_style.titleStyle}>
          {item.title}
        </Text>
        <Text numberOfLines={1} style={_style.subTitleStyle}>
          {item.subTitle}
        </Text>
      </View>
    </Button>
  );
};

export default AccountActionButton;
