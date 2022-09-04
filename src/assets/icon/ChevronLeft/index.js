import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={9}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m2.845 7 5.488 5.488a.833.833 0 0 1-1.179 1.178L.489 7 7.155.333a.833.833 0 1 1 1.179 1.179L2.844 7Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgComponent;
