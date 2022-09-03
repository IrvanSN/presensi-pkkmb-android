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
      d="M11.685 9c0 1.485-1.2 2.685-2.685 2.685A2.682 2.682 0 0 1 6.315 9c0-1.485 1.2-2.685 2.685-2.685s2.685 1.2 2.685 2.685Z"
      stroke="#87898E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 15.203c2.647 0 5.115-1.56 6.832-4.26.675-1.058.675-2.835 0-3.893C14.115 4.35 11.647 2.79 9 2.79c-2.648 0-5.115 1.56-6.833 4.26-.675 1.058-.675 2.835 0 3.893 1.718 2.7 4.185 4.26 6.833 4.26Z"
      stroke="#87898E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
