import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { useIsMounted } from 'hooks/useIsMounted'
import type { SvgProps } from 'react-native-svg'

// import { useThemeValue } from '@soulswapfinance/components'

import ICON_CONFIG, { ICON_NAMES } from './Icons'
// import platformEnv from '@soulswapfinance/shared/src/platformEnv'

export type IconProps = Omit<SvgProps, 'color'> & {
  name: ICON_NAMES;
  size?: number;
  // color?: ThemeToken;
  color?: string;
};

const Icon: FC<IconProps> = ({ name, size = 24, color, width, height }) => {
  const defaultColor = '#9854FF' // useThemeValue('icon-default');
  const primaryColor = color ?? '#9854FF' // useThemeValue(color ?? 'icon-default');
  let SVGComponent = ICON_CONFIG[name];
  const [_, setRefreshKey] = useState(Math.random());
  const isMounted = useIsMounted();

  useEffect(() => {
    // @ts-ignore
    if (!SVGComponent?.__ready && SVGComponent) {
      SVGComponent().then((module) => {
        // @ts-ignore
        SVGComponent = module.default;
        // @ts-ignore
        SVGComponent.__ready = true;
        // @ts-ignore
        ICON_CONFIG[name] = SVGComponent;
        if (isMounted) {
          setRefreshKey(Math.random());
        }
      });
    }
  }, [name]);

  if(!SVGComponent) return null;

  // @ts-ignore
  if (!SVGComponent?.__ready) return null;

  const svgColor = primaryColor || defaultColor;

  return (
    // @ts-ignore
    <SVGComponent
      // @ts-ignore
      width={width ?? size ?? 'auto'}
      height={height ?? size ?? 'auto'}
      color={svgColor}
    />
  );
};

export default Icon
// platformEnv.isExtensionBackground
  // ? ((() => null) as FC<IconProps>) :
  // Icon;
export type { ICON_NAMES };
