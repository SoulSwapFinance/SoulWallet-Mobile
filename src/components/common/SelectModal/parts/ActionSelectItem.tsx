import { ActionItemType } from 'components/Common/SelectModal/type';
import { SelectItem } from 'components/Design';
import React from 'react';

interface Props<T> {
  item: T;
  selectedValueMap: Record<string, boolean>;
  onSelectItem?: (item: T, isCheck?: boolean) => void;
}

export function ActionSelectItem<T>({ item, selectedValueMap, onSelectItem }: Props<T>) {
  const { label, backgroundColor, icon, key } = item as ActionItemType;
  return (
    <SelectItem
      label={label}
      backgroundColor={backgroundColor}
      icon={icon}
      onPress={() => {
        onSelectItem && onSelectItem(item);
      }}
      isSelected={!!selectedValueMap[key]}
    />
  );
}
