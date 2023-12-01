

import Svg, { Circle, SvgProps, Path } from 'react-native-svg';
const SvgNft = (props: SvgProps) => (
<Svg
    id="Icons" 
    viewBox="0 0 60 60" 
    // width="524" 
    // height="524"
    accessibilityRole="image"
    style={{
      marginTop: 2,
      marginBottom: 2,
    }}
    fill={"currentColor"}
    // fill={"#9854FF"}
    {...props}
>
        
    <Path d="M21.754,39.014A2.01,2.01,0,0,0,23.479,40H36.521a2.01,2.01,0,0,0,1.725-.986l6.472-11a2.007,2.007,0,0,0,0-2.029l-6.472-11A2.01,2.01,0,0,0,36.521,14H23.479a2.01,2.01,0,0,0-1.725.986l-6.472,11a2.007,2.007,0,0,0,0,2.029ZM34.006,36h-8a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2ZM32,26a1,1,0,0,1,0,2H30v3a1,1,0,0,1-2,0V23a1,1,0,0,1,1-1h4a1,1,0,0,1,0,2H30v2Zm4-4h4a1,1,0,0,1,0,2H39v7a1,1,0,0,1-2,0V24H36a1,1,0,0,1,0-2Zm-9.994-4h8a1,1,0,0,1,0,2h-8a1,1,0,0,1,0-2ZM19,23a1,1,0,0,1,1.848-.53L24,27.513V23a1,1,0,0,1,2,0v8a1,1,0,0,1-1.848.53L21,26.487V31a1,1,0,0,1-2,0Z"/>
    <Circle cx="20" cy="8" r="1"/>
        <Path d="M23.479,12H36.521a4.014,4.014,0,0,1,3.448,1.971L44,20.822V7a3,3,0,0,0-3-3H19a3,3,0,0,0-3,3V20.822l4.031-6.851A4.014,4.014,0,0,1,23.479,12ZM17,8a3,3,0,1,1,3,3A3,3,0,0,1,17,8Z"/>
    <Circle cx="40" cy="46" r="1"/>
        <Path d="M57.565,12.75a2.978,2.978,0,0,0-1.857-1.358L46,9.014V24.221l.441.75a4,4,0,0,1,0,4.057L46,29.779V47a5.006,5.006,0,0,1-5,5H28.1l16.7,4.078a3,3,0,0,0,3.621-2.2l9.491-38.862A2.961,2.961,0,0,0,57.565,12.75Z"/>
        <Path d="M36.521,42H23.479a4.014,4.014,0,0,1-3.448-1.971L16,33.178V47a3,3,0,0,0,3,3H41a3,3,0,0,0,3-3V33.178l-4.031,6.851A4.014,4.014,0,0,1,36.521,42ZM40,43a3,3,0,1,1-3,3A3,3,0,0,1,40,43Z"/>
    <Path d="M21.227,52H19a5.006,5.006,0,0,1-5-5V29.779l-.441-.75a4,4,0,0,1,0-4.057L14,24.221V8.853L4.266,11.3a2.994,2.994,0,0,0-2.174,3.636l9.76,38.8A3.006,3.006,0,0,0,15.5,55.91l9.953-2.5-2.5-.61A4.924,4.924,0,0,1,21.227,52Z"/>
</Svg>
);
export default SvgNft;
