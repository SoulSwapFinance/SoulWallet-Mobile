import Svg, { G, Path, SvgProps } from 'react-native-svg';
const SvgTelegram = (props: SvgProps) => (
  <Svg
    height="512"
    viewBox="0 0 176 176"
    width="512"
    accessibilityRole="image"
    fill={"currentColor"}
    {...props}
  >
    <G id="Layer_2" data-name="Layer 2">
      <G id="telegram">
        <Path d="m123.33 62.35-44.63 36.48-2.1 1.72a2.27 2.27 0 0 0 -.84 1.48l-.47 3.88-1.29 10.9a.5.5 0 0 1 -1 .09l-3.63-10.9-3.75-11.15a2.24 2.24 0 0 1 1.08-2.66l46.44-26.62 8.74-5c1.27-.74 2.57.86 1.45 1.78z" />
        <Path d="m152 0h-128a24 24 0 0 0 -24 24v128a24 24 0 0 0 24 24h128a24 24 0 0 0 24-24v-128a24 24 0 0 0 -24-24zm-9.11 50.94-17.18 75.91c-.81 3.56-5.33 5.17-8.5 3l-25.94-17.6-13.21 12.49a4.54 4.54 0 0 1 -7.32-1.62l-4.77-14-4.77-14-25.57-7a3.32 3.32 0 0 1 -.29-6.41l98.78-35.59 1.82-.65c3.83-1.34 7.79 1.76 6.95 5.47z" />
      </G></G>
  </Svg>
);
export default SvgTelegram;
