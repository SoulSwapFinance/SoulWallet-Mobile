import Svg, { G, Path, SvgProps } from 'react-native-svg';
const SvgBloomberg = (props: SvgProps) => (
<Svg height="512" viewBox="0 0 400 400" width="512"
    fill="currentColor"
    // fill={"#FFFFFF"}
    accessibilityRole="image"
    {...props}
>
  <G id="Layer_2" data-name="Layer 2">
  <G id="Layer_1-2" data-name="Layer 1">
  <G id="B">
    <Path d="m193.38 183.75h-23v-42.75h25.24c21.26 0 29 5.5 29 21.75s-7.5 21-31.24 21z"/>
    <Path d="m228.88 238.25c0 15.75-7.5 20.75-27.76 20.75h-30.74v-43h31c19.74 0 27.5 6 27.5 22.25z"/>
    <Path d="m200 0c-110.46 0-200 89.54-200 200 0 110.46 89.54 200 200 200 110.46 0 200-89.54 200-200 0-110.46-89.54-200-200-200zm59.88 287.25c-10.76 8-28.76 12-54.5 12-27.26 0-53-1-77.5-3-2.5-.25-3.76-1.25-3.76-3.5v-185.5c0-2.25 1.26-3.25 3.76-3.5q36.75-3 72.74-3c25.76 0 44 4 54.76 12.25s16.24 22.25 16.24 42c0 29-8.24 41-31 44.75v.75c26 2.25 35.26 15 35.26 44.75 0 20-5.26 34-16 42z"/>
</G>
</G>
</G>
  </Svg>
);
export default SvgBloomberg;
