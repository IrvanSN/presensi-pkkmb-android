import Svg, {Path, Rect} from 'react-native-svg';
import React from 'react';

const ChevronLeftNavigator = props => (
  <Svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect opacity={0.07} width={32} height={32} rx={16} fill="#000" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m13.845 16 5.488 5.488a.833.833 0 1 1-1.178 1.179L11.488 16l6.667-6.667a.833.833 0 0 1 1.178 1.179L13.845 16Z"
      fill="#000"
    />
  </Svg>
);
const ChevronRight = props => (
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
const ChevronLeft = props => (
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
const UserChecklist = props => (
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
const SquarePlus = props => (
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
const QR = props => (
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
const Clip = props => (
  <Svg
    width={40}
    height={45}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15.469 0a4.219 4.219 0 0 0-4.219 4.219V7.03a4.22 4.22 0 0 0 4.219 4.219h8.437a4.22 4.22 0 0 0 4.219-4.219V4.22A4.219 4.219 0 0 0 23.906 0H15.47Zm8.437 2.813a1.406 1.406 0 0 1 1.407 1.406V7.03a1.406 1.406 0 0 1-1.407 1.407H15.47a1.406 1.406 0 0 1-1.406-1.407V4.22a1.406 1.406 0 0 1 1.406-1.407h8.437Z"
      fill="#F7AD48"
    />
    <Path
      d="M8.438 4.219H5.624A5.625 5.625 0 0 0 0 9.844v29.531A5.625 5.625 0 0 0 5.625 45H33.75a5.625 5.625 0 0 0 5.625-5.625V9.844a5.625 5.625 0 0 0-5.625-5.625h-2.813V7.03a7.032 7.032 0 0 1-7.03 7.032h-8.438A7.031 7.031 0 0 1 8.438 7.03V4.22ZM25.311 22.5a2.812 2.812 0 1 1 5.625 0v14.063a2.812 2.812 0 1 1-5.625 0V22.5ZM8.438 33.75a2.812 2.812 0 1 1 5.626 0v2.813a2.812 2.812 0 1 1-5.626 0V33.75Zm11.25-8.438a2.812 2.812 0 0 1 2.813 2.813v8.438a2.812 2.812 0 1 1-5.625 0v-8.438a2.812 2.812 0 0 1 2.813-2.813Z"
      fill="#F7AD48"
    />
  </Svg>
);
const BackwardClock = props => (
  <Svg
    width={45}
    height={45}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M44.998 22.459v.043C44.998 34.928 34.925 45 22.498 45a22.404 22.404 0 0 1-14.163-5.016l.041.034a2.179 2.179 0 0 1-.167-3.232l1.022-1.022a2.18 2.18 0 0 1 2.9-.177l-.004-.003a16.592 16.592 0 0 0 10.37 3.61 16.695 16.695 0 0 0 15.518-22.848 16.692 16.692 0 0 0-19.94-9.943 16.695 16.695 0 0 0-7.021 3.941l.01-.007 4.605 4.605a1.45 1.45 0 0 1-1.028 2.477H1.451A1.451 1.451 0 0 1 0 15.967V2.78A1.453 1.453 0 0 1 2.477 1.75l4.48 4.48A22.419 22.419 0 0 1 22.5 0C34.912 0 44.977 10.05 45 22.455v.002l-.002.002Zm-16.413 7.145.89-1.145a2.172 2.172 0 0 0-.378-3.053l-.006-.003L25.4 22.53v-9.465a2.18 2.18 0 0 0-2.179-2.179H21.77a2.18 2.18 0 0 0-2.18 2.179v12.3l5.936 4.614a2.18 2.18 0 0 0 3.056-.369l.004-.006Z"
      fill="#F7AD48"
    />
  </Svg>
);
const Eye = props => (
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
const EyeSlash = props => (
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
const User = props => (
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
const Lock = props => (
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

export {
  Lock,
  User,
  EyeSlash,
  Eye,
  BackwardClock,
  Clip,
  QR,
  SquarePlus,
  UserChecklist,
  ChevronLeft,
  ChevronRight,
  ChevronLeftNavigator,
};
