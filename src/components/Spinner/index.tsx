import type { ComponentProps, FC } from 'react'

import { Spinner as NBSpinner } from 'native-base'

type SpinnerSize = 'sm' | 'lg';

export type BadgeProps = {
  size?: SpinnerSize;
} & ComponentProps<typeof NBSpinner>;

export const Spinner: FC<BadgeProps> = ({ ...rest }) => {
  const bgColor = '#8C8CA1'
  return <NBSpinner color={bgColor} {...rest} />;
};
// SpinnerLoading
export default Spinner;
