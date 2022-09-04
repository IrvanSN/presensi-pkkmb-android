import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={45}
    height={45}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M31.5 0h-18C6.055 0 0 6.055 0 13.5v29.25A2.25 2.25 0 0 0 2.25 45H31.5C38.945 45 45 38.945 45 31.5v-18C45 6.055 38.945 0 31.5 0Zm2.25 24.75h-9v9h-4.5v-9h-9v-4.5h9v-9h4.5v9h9v4.5Z"
      fill="#F7AD48"
    />
  </Svg>
);

export default SvgComponent;
