import React from 'react';
import Button from '../../../Design/Button';
import { View } from 'react-native';
import Text from 'components/Text';
import { CaretRight, IconProps } from 'phosphor-react-native';
import Icon from '../../../Design/Icon';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import AccountActionButtonStyles from './style';
import { ColorMap } from 'styles/color';

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
          <Icon phosphorIcon={item.icon} weight={'fill'} iconColor={ColorMap.lightPurple} />
        </View>
      }
      onPress={item.onPress}
      style={{ marginBottom: 8 }}
      contentAlign={'left'}
    >
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={
          _style.titleWelcomeStyle
          }>
          {item.title}
        </Text>
        {/* <Text numberOfLines={1} style={_style.subTitleStyle}>
          {item.subTitle}
        </Text> */}
      </View>
      <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
          <CaretRight size={20} color={ColorMap.lightPurple} weight={'bold'} />
      </View>
    </Button>
  );
};

export default AccountActionButton;
