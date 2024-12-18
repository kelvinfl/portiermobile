import Svg, { Path, SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={361} height={491} fill="none" {...props}>
    <Path
      fill="#305AEF"
      d="M470.265 103.623c58.204 60.509 104.841 145.299 91.41 220.453-13.432 74.77-86.56 139.904-164.538 168.039-77.606 28.134-159.688 19.655-230.951-14.646-71.262-34.687-131.704-95.196-155.21-172.278-23.132-77.467-9.7-171.506 40.295-230.089 49.623-58.196 135.436-80.55 213.041-73.998 77.979 6.552 147.749 42.395 205.953 102.519Z"
    />
  </Svg>
);
export { SvgComponent as GreetingBottomBlob };
