import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={56}
    height={45}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M55.08 14.55a1.873 1.873 0 0 1 0 2.656l-11.25 11.25a1.875 1.875 0 0 1-2.655 0L35.55 22.83a1.877 1.877 0 1 1 2.655-2.655l4.297 4.301 9.923-9.926a1.872 1.872 0 0 1 2.655 0Z"
      fill="#F7AD48"
    />
    <Path
      d="M3.75 45S0 45 0 41.25s3.75-15 22.5-15S45 37.5 45 41.25 41.25 45 41.25 45H3.75ZM22.5 22.5a11.25 11.25 0 1 0 0-22.5 11.25 11.25 0 0 0 0 22.5Z"
      fill="#F7AD48"
    />
  </Svg>
);

export default SvgComponent;
