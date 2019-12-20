import { DotProps, CustomDotProps } from "../GenericTypes.d";

export interface DotsProps {
  dotsActiveFlags: boolean[];
  dotStyles?: DotProps;
  dotClickSlide: (dotIndex: number) => void;
  useCustomDot?: boolean;
  customDot?: CustomDotProps;
}
