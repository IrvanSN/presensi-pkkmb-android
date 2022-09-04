import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={19}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M10.972 7.103 7.15 10.898A2.66 2.66 0 0 1 6.358 9 2.691 2.691 0 0 1 9.06 6.315c.748 0 1.42.3 1.91.788Z"
      stroke="#87898E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.456 4.327c-1.322-.99-2.832-1.53-4.395-1.53-2.665 0-5.15 1.56-6.879 4.26-.68 1.058-.68 2.835 0 3.893.597.93 1.292 1.732 2.047 2.378M6.358 14.648c.86.36 1.774.555 2.703.555 2.666 0 5.15-1.56 6.88-4.26.679-1.058.679-2.835 0-3.893a12.17 12.17 0 0 0-.801-1.102"
      stroke="#87898E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.712 9.525a2.683 2.683 0 0 1-2.13 2.115M7.15 10.898 1.51 16.5M16.612 1.5l-5.64 5.603"
      stroke="#87898E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
