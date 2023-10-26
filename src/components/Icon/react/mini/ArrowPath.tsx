import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgArrowPath = (props: SvgProps) => (
  <Svg 
    id="Layer_1"
    height="512" 
    viewBox="0 0 48 48" 
    width="512" 
    data-name="Layer 1"
    fill="currentColor"
    accessibilityRole="image"
    {...props}
  >
    <Path d="m48 24a24 24 0 1 0 -24 24 24 24 0 0 0 24-24zm-38.221 0a14.218 14.218 0 0 1 27.211-5.784l.8-1.542a2 2 0 1 1 3.547 1.849l-3.337 6.402a2 2 0 0 1 -2.7.848l-6.391-3.334a2 2 0 1 1 1.85-3.546l2.781 1.45a10.217 10.217 0 1 0 -2.308 10.888 2 2 0 1 1 2.828 2.829 14.226 14.226 0 0 1 -24.281-10.06z"/>
  </Svg>
  );
  export default SvgArrowPath;
  
  // <Svg
  //   viewBox="0 0 20 20"

  // >
  //   <Path
  //     fillRule="evenodd"
  //     d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219z"
  //     clipRule="evenodd"
  //   />
  // </Svg>