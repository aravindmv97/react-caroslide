import { DotProps, CustomDotProps } from "../GenericTypes.d";

export interface DotsProps {
  dotsActiveFlags: boolean[];
  dotStyles?: DotProps;
  dotClickSlide: (dotIndex: number) => void;
  useCustomDot?: boolean;
  customDot?: CustomDotProps;
}

// Style Props Types

export interface DotsWrapperProps {
  margin?: string;
}

export interface DotStyleProps {
  active?: boolean;
  dotColor?: string;
  margin?: string;
}
