import React from 'react';
import { IconProps } from 'phosphor-react-native';
import { Icon } from 'components/Design';
import { SWIconProps } from 'components/Design/Icon';

export function getButtonIcon(
  icon: React.ElementType<IconProps>,
  weight: SWIconProps['weight'] = 'fill',
  size: SWIconProps['size'] = 'lg',
) {
  return (color: string) => <Icon phosphorIcon={icon} weight={weight} iconColor={color} size={size} />;
}
