import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={9}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.568 7.517.985 2.126a.833.833 0 0 1 1.158-1.2l6.782 6.55-6.55 6.782A.833.833 0 1 1 1.178 13.1l5.391-5.583Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgComponent;
