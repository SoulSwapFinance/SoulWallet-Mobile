import { PresetBrandColorType, PresetColorType, PresetStatusColorType } from '.'
import React from 'react'

export type LiteralUnion<T extends string> = T | (string & {});

export interface TagPropsType {
  selected?: boolean;
  closable?: boolean;
  onClose?: () => void;
  afterClose?: () => void;
  icon?: React.ReactNode;
  bgType?: 'default' | 'gray' | 'filled';
  shape?: 'default' | 'square' | 'round';
  color?: LiteralUnion<PresetColorType | PresetStatusColorType | PresetBrandColorType>;
}
