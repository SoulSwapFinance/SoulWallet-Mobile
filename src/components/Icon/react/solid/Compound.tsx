import Svg, { Circle, Path, SvgProps } from 'react-native-svg';
const SvgCompound = (props: SvgProps) => (
    <Svg 
      id="Icons" 
      height="512" 
      viewBox="0 0 60 60"
      width="512"
      fill="currentColor"
      accessibilityRole="image"
      {...props}
    >
      <Circle cx="49" cy="49" r="2"/>
      <Circle cx="39" cy="39" r="2"/>
      <Path d="m5 36h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h25.527a15.881 15.881 0 0 1 1.638-4z"/>
      <Path d="m35.723 30.333a.982.982 0 0 0 -.723-.333h-30a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h26.53a16.1 16.1 0 0 1 4.193-3.667z"/>
      <Path d="m26.317 18.71a6.356 6.356 0 0 0 3.946-.058 6.636 6.636 0 0 0 3.837-3.286c2.226-4.445 1.985-10.72 1.779-13.211a.171.171 0 0 0 -.093-.123.229.229 0 0 0 -.219-.008c-1.112.54-2.267 1.031-3.384 1.505-3.847 1.635-7.481 3.179-9.407 6.594a5.779 5.779 0 0 0 -.639 4.043 27.322 27.322 0 0 1 3.9-4.43 3 3 0 0 1 3.942 4.52 24.646 24.646 0 0 0 -3.662 4.454z"/>
      <Path d="m11.6 17.1a.976.976 0 0 0 -.529.548 1.007 1.007 0 0 0 .584 1.284c.743.3 6.695 2.889 7.291 9.066h2.106c.483-8.394 6.826-14.523 7.577-15.219a1.024 1.024 0 0 0 .125-1.441 1.011 1.011 0 0 0 -1.409-.089 27.856 27.856 0 0 0 -6.967 10.351 1 1 0 0 1 -.794.64.984.984 0 0 1 -.942-.387 15.645 15.645 0 0 0 -6.28-4.781 1.046 1.046 0 0 0 -.762.028z"/>
      <Path d="m6.013 11.47c-.988-.137-2.007-.278-3.013-.47.36 1.932 1.487 6.865 4.153 9.864a5.251 5.251 0 0 0 6.047 1.225 11.4 11.4 0 0 0 -2.264-1.289 3 3 0 0 1 2.118-5.608 16.227 16.227 0 0 1 2.8 1.456 4.554 4.554 0 0 0 -1.171-2.068c-2.197-2.217-5.341-2.651-8.67-3.11z"/>
      <Path d="m44 30a14 14 0 1 0 14 14 14.015 14.015 0 0 0 -14-14zm-5 5a4 4 0 1 1 -4 4 4 4 0 0 1 4-4zm-1.293 16.707a1 1 0 0 1 -1.414-1.414l14-14a1 1 0 0 1 1.414 1.414zm11.293 1.293a4 4 0 1 1 4-4 4 4 0 0 1 -4 4z"/>
      <Path d="m5 42a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h23.139a14.458 14.458 0 0 1 0-4z"/>
      <Path d="m31.53 54h-26.53a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h30a.982.982 0 0 0 .723-.333 16.1 16.1 0 0 1 -4.193-3.667z"/>
      <Path d="m7 48a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h23.165a15.881 15.881 0 0 1 -1.638-4z"/>
    </Svg>
);
export default SvgCompound;
