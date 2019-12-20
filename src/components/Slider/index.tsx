import React, { FC, SFC, useState, useEffect, Fragment } from "react";
import styled from "styled-components";

import { ImageWrapper } from "../Generics";

import LeftArrow from "../images/leftArrow.png";
import RightArrow from "../images/rightArrow.png";
import { BooleanLiteralTypeAnnotation } from "@babel/types";

const SliderContainer = styled.div<{ display: string }>`
  display: ${props => props.display || "flex"};
  grid-template-columns: 0.1fr 4.8fr 0.1fr;
  width: 100%;
  height: 300px;
  background: #eee;
  position: relative;
`;

const SliderWrapper = styled.div`
  overflow-x: hidden;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  transition: all 0.1s ease-out;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  background: gray;
  width: auto;
  cursor: pointer;

  & > div {
    flex-shrink: 0;
    flex-grow: 1;
    padding: 10px;
  }

  @media (max-width: 700px) {
    overflow-x: scroll;
  }
`;

const SliderItemWrapper = styled.div<{ width: string }>`
  height: max-content;
  width: ${props => props.width || "100%"};
  display: flex;

  & > div {
    width: 100%;
    background: #eee;
    border: 1px solid #333;
  }
`;

const SliderItem = styled.div``;

const LeftArrowIcon = styled(ImageWrapper)<{
  position: string;
  top?: string | number;
  left?: string | number;
}>`
  top: ${props => props.top || 0};
  left: ${props => props.left || 0};
  cursor: pointer;
  position: ${props => props.position || "relative"};
  background: #fff;
`;

const RightArrowIcon = styled(ImageWrapper)<{
  position: string;
  top?: string | number;
  right?: string | number;
}>`
  top: ${props => props.top || 0};
  right: ${props => props.right || 0};
  cursor: pointer;
  position: ${props => props.position || "relative"};
  background: #fff;
`;

const CustomArrow = styled.div<{
  children: React.ReactElement;
  className?: string;
}>``;

const DotsWrapper = styled.div<{ margin?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${props => props.margin || "20px 0"};

  & > div {
    margin-left: 10px;
  }
`;

const Dot = styled.div<{
  active?: boolean;
  dotColor?: string;
  margin?: string;
}>`
  cursor: pointer;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: 1px solid ${props => props.dotColor || "#eee"};
  background: ${props => (props.active ? props.dotColor || "#3396FF" : "#fff")};
`;

interface ArrowPositionUtilProps {
  leftArrow: { left: string | number; top: string | number };
  rightArrow: { right: string | number; top: string | number };
}

interface DotProps {
  color?: string;
  margin?: string;
}

interface CustomDotProps {
  inactive?: React.ReactElement;
  active?: React.ReactElement;
}

interface SliderProps {
  children: React.ReactElement[];
  singleItem?: boolean;
  multipleItems?: boolean;
  itemCount?: number;
  singleItemScroll?: boolean;
  useDynamicWidth?: boolean;
  hoveredArrows?: boolean;
  arrowPositionUtils?: ArrowPositionUtilProps | undefined;
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

export const Slider: FC<SliderProps> = ({
  children,
  singleItem,
  itemCount,
  singleItemScroll,
  useDynamicWidth,
  hoveredArrows,
  arrowPositionUtils,
  useCustomArrows,
  customLeftArrow,
  customRightArrow,
  sliderDots,
  sliderDotsPosition,
  dotStyles,
  useCustomDot,
  customDot
}) => {
  const [mousePoints, setMousePoints] = useState({ start: 0, end: 0 });
  const [diff, setDIff] = useState(0);
  const [divHolded, setDivHolder] = useState(false);

  const configUtils = {
    itemWrapperWidth: singleItem
      ? "100%"
      : `${itemCount ? 100 / itemCount : 3}%`,
    containerDisplay: hoveredArrows ? "flex" : "grid",
    arrowPositions: hoveredArrows ? "absolute" : "inherit"
  };

  const leftArrowTop = arrowPositionUtils!.leftArrow.top;
  const leftArrowLeft = arrowPositionUtils!.leftArrow.left;
  const rightArrowTop = arrowPositionUtils!.rightArrow.top;
  const rightArrowRight = arrowPositionUtils!.rightArrow.right;

  const dotCount =
    children && singleItem
      ? children.length
      : itemCount
      ? Math.ceil(children.length / itemCount)
      : 1;
  const [dotsActiveFlags, setDotsActiveFlags] = useState(
    new Array(dotCount).fill(true, 0, 1).fill(false, 1, dotCount)
  );
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  function left(selectedDotsDiff?: number): void {
    let offsetWidth = document.getElementById(
      useDynamicWidth || !singleItemScroll ? "container" : "item"
    )!.offsetWidth;
    document.getElementById("container")!.scrollLeft -= selectedDotsDiff
      ? offsetWidth * selectedDotsDiff
      : offsetWidth;
  }

  function right(selectedDotsDiff?: number): void {
    let offsetWidth = document.getElementById(
      useDynamicWidth || !singleItemScroll ? "container" : "item"
    )!.offsetWidth;
    document.getElementById("container")!.scrollLeft += selectedDotsDiff
      ? offsetWidth * selectedDotsDiff
      : offsetWidth;
  }

  function selectStartPos(e: React.MouseEvent<HTMLDivElement>) {
    const points = { start: e.pageX, end: 0 };
    setMousePoints(points);
    setDivHolder(true);
  }
  function selectEndPosition(e: React.MouseEvent<HTMLDivElement>) {
    const points = { start: mousePoints.start, end: e.pageX };
    setMousePoints(points);
    setDivHolder(false);
  }

  function moveMouse(e: React.MouseEvent<HTMLDivElement>): void {
    if (divHolded) {
      setDIff(mousePoints.start - e.pageX);
    }
  }

  function dotClickSlide(dotIndex: number): void {
    if (activeDotIndex + 1 === dotIndex || activeDotIndex - 1 === dotIndex) {
      activeDotIndex < dotIndex ? right() : left();
    } else {
      activeDotIndex < dotIndex
        ? right(Math.abs(activeDotIndex - dotIndex))
        : left(Math.abs(activeDotIndex - dotIndex));
    }
    let dotFlags = dotsActiveFlags;
    dotFlags
      .fill(false, 0, dotsActiveFlags.length)
      .fill(true, dotIndex, dotIndex + 1);
    setActiveDotIndex(dotIndex);
    setDotsActiveFlags(dotFlags);
  }

  useEffect(() => {
    if (useCustomArrows && customLeftArrow) {
      let leftCustomArrowChild = document.getElementById("leftCustomArrow");
      if (leftCustomArrowChild && leftCustomArrowChild.childNodes) {
        leftCustomArrowChild.childNodes[0].addEventListener("click", () => {
          left();
        });
      }
    }
    if (useCustomArrows && customRightArrow) {
      let rightCustomArrowChild = document.getElementById("rightCustomArrow");
      if (rightCustomArrowChild && rightCustomArrowChild.childNodes) {
        rightCustomArrowChild.childNodes[0].addEventListener("click", () => {
          right();
        });
      }
    }
    if (
      useCustomDot &&
      typeof customDot!.inactive !== "undefined" &&
      typeof customDot!.active !== "undefined"
    ) {
      let dots = document.getElementById("dotsWrapper")!.children;
      Array.from(dots).forEach((dot, i) => {
        dot.addEventListener("click", () => {
          dotClickSlide(i);
        });
      });
    }
  }, []);

  return (
    <>
      {sliderDots && sliderDotsPosition === "top" ? (
        <Dots
          dotStyles={dotStyles}
          dotsActiveFlags={dotsActiveFlags}
          dotClickSlide={dotClickSlide}
          useCustomDot={useCustomDot}
          customDot={customDot}
        />
      ) : null}
      <SliderContainer display={configUtils.containerDisplay}>
        {useCustomArrows && customLeftArrow ? (
          <CustomArrow id="leftCustomArrow">{customLeftArrow}</CustomArrow>
        ) : (
          <LeftArrowIcon
            src={LeftArrow}
            height={"20px"}
            width={"20px"}
            onClickProps={right}
            position={configUtils.arrowPositions}
            top={leftArrowTop}
            left={leftArrowLeft}
          />
        )}
        <SliderWrapper
          id="container"
          onMouseDown={selectStartPos}
          onMouseUp={selectEndPosition}
          onMouseMove={moveMouse}
        >
          {children.map((child, childId) => (
            <SliderItemWrapper
              id="item"
              key={childId}
              width={configUtils.itemWrapperWidth}
            >
              <SliderItem>{child}</SliderItem>
            </SliderItemWrapper>
          ))}
        </SliderWrapper>
        {useCustomArrows && customRightArrow ? (
          <CustomArrow id="rightCustomArrow">{customRightArrow}</CustomArrow>
        ) : (
          <RightArrowIcon
            src={RightArrow}
            height={"20px"}
            width={"20px"}
            onClickProps={left}
            position={configUtils.arrowPositions}
            top={rightArrowTop}
            right={rightArrowRight}
          />
        )}
      </SliderContainer>
      {sliderDots && sliderDotsPosition === "bottom" ? (
        <Dots
          dotStyles={dotStyles}
          dotsActiveFlags={dotsActiveFlags}
          dotClickSlide={dotClickSlide}
          useCustomDot={useCustomDot}
          customDot={customDot}
        />
      ) : null}
    </>
  );
};

interface DotsProps {
  dotsActiveFlags: boolean[];
  dotStyles?: DotProps;
  dotClickSlide: (dotIndex: number) => void;
  useCustomDot?: boolean;
  customDot?: CustomDotProps;
}

const Dots: SFC<DotsProps> = ({
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
          activeFlag ? (
            <Fragment key={dotIndex}>{customDot!.active}</Fragment>
          ) : (
            <Fragment key={dotIndex}>{customDot!.inactive}</Fragment>
          )
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

// Single **
// Dynamic **
// Highlight middle, first (1, 2)
// Dynamic item widths

// Arrows -> Corner + Hovered **
// Dots -> Top, Bottom + Dynamic
// Dynamic navigation components
