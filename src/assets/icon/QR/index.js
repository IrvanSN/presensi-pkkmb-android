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
      d="M7.5 7.5h11.25v11.25H7.5V7.5Zm30 0v11.25H26.25V7.5H37.5ZM26.25 28.125H30v-3.75h-3.75v-3.75H30v3.75h3.75v-3.75h3.75v3.75h-3.75v3.75h3.75v5.625h-3.75v3.75H30v-3.75h-5.625v3.75h-3.75V30h5.625v-1.875Zm3.75 0v5.625h3.75v-5.625H30ZM7.5 37.5V26.25h11.25V37.5H7.5Zm3.75-26.25V15H15v-3.75h-3.75Zm18.75 0V15h3.75v-3.75H30ZM11.25 30v3.75H15V30h-3.75ZM7.5 20.625h3.75v3.75H7.5v-3.75Zm9.375 0h7.5v7.5h-3.75v-3.75h-3.75v-3.75Zm3.75-9.375h3.75v7.5h-3.75v-7.5ZM3.75 3.75v7.5H0v-7.5A3.75 3.75 0 0 1 3.75 0h7.5v3.75h-7.5ZM41.25 0A3.75 3.75 0 0 1 45 3.75v7.5h-3.75v-7.5h-7.5V0h7.5ZM3.75 33.75v7.5h7.5V45h-7.5A3.75 3.75 0 0 1 0 41.25v-7.5h3.75Zm37.5 7.5v-7.5H45v7.5A3.75 3.75 0 0 1 41.25 45h-7.5v-3.75h7.5Z"
      fill="#F7AD48"
    />
  </Svg>
);

export default SvgComponent;
