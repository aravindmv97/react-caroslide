import { DotProps, CustomDotProps } from "../GenericTypes.d";

export interface ArrowPositions {
  left?: string | number;
  top?: string | number;
  bottom?: string | number;
  right?: string | number;
}

export interface HoveredArrowPositionUtils {
  leftArrow: ArrowPositions;
  rightArrow: ArrowPositions;
}

export interface SliderProps {
  children: React.ReactElement[];
  singleItem?: boolean;
  multipleItems?: boolean;
  itemCount?: number;
  singleItemScroll?: boolean;
  useDynamicWidth?: boolean;
  hoveredArrows?: boolean;
  hoveredArrowPositionUtils?: HoveredArrowPositionUtils | undefined;
  useCustomArrows?: boolean;
  customLeftArrow?: React.ReactElement;
  customRightArrow?: React.ReactElement;
  sliderDots?: boolean;
  sliderDotsPosition?: string;
  infiniteSlides?: boolean;
  dotStyles?: DotProps;
  customDot?: CustomDotProps;
  useCustomDot?: boolean;
}

// Style Props Types

export interface SliderContainerProps {
  display: string;
}

export interface SliderItemWrapperProps {
  width: string;
  bg?: string;
}
export interface ArrowIconProps {
  position: string;
  hoveredArrowPosition?: string;
}

export interface CustomArrowProps {
  children: React.ReactElement;
  className?: string;
}
