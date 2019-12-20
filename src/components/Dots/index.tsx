import React, { SFC } from "react";
import styled from "styled-components";

import { DotsProps, DotsWrapperProps, DotStyleProps } from "./Types.d";

const DotsWrapper = styled.div<DotsWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${props => props.margin || "20px 0"};

  & > div {
    margin-left: 10px;
  }
`;

const Dot = styled.div<DotStyleProps>`
  margin: ${props => props.margin || "0"};
  cursor: pointer;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: 1px solid ${props => props.dotColor || "#eee"};
  background: ${props => (props.active ? props.dotColor || "#3396FF" : "#fff")};
`;

const CustomDotWrapper = styled.div``;

export const Dots: SFC<DotsProps> = ({
  dotsActiveFlags,
  dotClickSlide,
  dotStyles,
  useCustomDot,
  customDot
}) => {
  return (
    <DotsWrapper id="dotsWrapper">
      {dotsActiveFlags.map((activeFlag, dotIndex) =>
        useCustomDot &&
        typeof customDot!.inactive !== "undefined" &&
        typeof customDot!.active !== "undefined" ? (
          <CustomDotWrapper
            onClick={() => dotClickSlide(dotIndex)}
            key={dotIndex}
          >
            {activeFlag ? customDot!.active : customDot!.inactive}
          </CustomDotWrapper>
        ) : (
          <Dot
            key={dotIndex}
            active={activeFlag}
            dotColor={dotStyles!.color}
            margin={dotStyles!.margin}
            onClick={() => dotClickSlide(dotIndex)}
          />
        )
      )}
    </DotsWrapper>
  );
};
