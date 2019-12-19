import React, { SFC } from "react";
import styled from "styled-components";

export interface ImageWrapperProps {
  src: string;
  height: string;
  width: string;
  radius?: string;
  objFit?: string;
  alignItems?: string;
  justifyContent?: string;
  className?: string;
  onClickProps?: () => void;
}

export const CenterItemsWrapper = styled.div<
  Pick<ImageWrapperProps, "alignItems" | "justifyContent">
>`
  display: flex;
  justify-content: ${props => props.justifyContent || "center"};
  align-items: ${props => props.alignItems || "center"};
`;

const Image = styled.img<ImageWrapperProps>`
  height: ${props => props.height};
  width: ${props => props.width};
  object-fit: ${props => props.objFit};
  border-radius: ${props => props.radius};
`;

export const ImageWrapper: SFC<ImageWrapperProps> = ({
  src,
  height,
  width,
  objFit,
  radius,
  onClickProps,
  alignItems,
  justifyContent,
  className
}) => {
  return (
    <CenterItemsWrapper
      className={className}
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      <Image
        src={src}
        height={height}
        width={width}
        objFit={objFit}
        radius={radius}
        onClick={onClickProps}
      />
    </CenterItemsWrapper>
  );
};
