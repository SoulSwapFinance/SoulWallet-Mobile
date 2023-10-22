import React from 'react';
import { PresetBrandColorType, PresetColorType, PresetStatusColorType } from '.';

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
