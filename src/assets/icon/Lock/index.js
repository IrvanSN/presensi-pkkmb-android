import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={14}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M9.992 7.074V4.27a3.27 3.27 0 0 0-6.54 0v2.804"
      stroke="#87898E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.722 6.722c-1.37 0-2.442.104-3.27.352C1.636 7.617 1 8.856 1 11.218c0 3.438 1.346 4.496 5.722 4.496s5.722-1.058 5.722-4.496c0-2.362-.635-3.6-2.452-4.144-.828-.248-1.9-.352-3.27-.352Z"
      stroke="#87898E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
