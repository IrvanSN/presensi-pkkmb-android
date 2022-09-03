import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={15}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M11.5 15H2.944A1.944 1.944 0 0 1 1 13.056c0-3.174 4.667-3.111 6.222-3.111 1.556 0 6.222-.063 6.222 3.11 0 1.075-.87 1.945-1.944 1.945ZM7.222 7.222a3.111 3.111 0 1 0 0-6.222 3.111 3.111 0 0 0 0 6.222Z"
      stroke="#87898E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
