import Svg, { G, Path, SvgProps } from 'react-native-svg';
const SvgBlockworks = (props: SvgProps) => (
  <Svg
    height="512" viewBox="0 0 512 512" width="512"
    // fill="#5B35D4"
    // fill={'background-selected'}
    fill={'#A161FB'}
    // fill={'#8f8fa3'}
    accessibilityRole="image"
    {...props}
  >
    <G>
      <Path d="m374.508 230.982c19.526-24.349 31.227-55.231 31.227-88.799-.001-78.4-63.783-142.183-142.183-142.183h-138.552c-24.853 0-45 20.147-45 45v422c0 24.853 20.147 45 45 45h148.183c87.572 0 158.817-71.245 158.817-158.817 0-49.09-22.391-93.046-57.492-122.201zm-204.508-140.982h93.552c28.773 0 52.183 23.409 52.183 52.183s-23.409 52.183-52.183 52.183h-93.552zm103.183 332h-103.183v-137.635h103.183c37.946 0 68.817 30.872 68.817 68.817s-30.871 68.818-68.817 68.818z" />
    </G>
  </Svg>
);
export default SvgBlockworks;
