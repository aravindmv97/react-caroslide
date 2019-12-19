import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";

import { ImageWrapper } from "../Generics";

import LeftArrow from "../images/leftArrow.png";
import RightArrow from "../images/rightArrow.png";

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
  transition: all 0.01s ease-in-out;
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

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  & > div:nth-child(2),
  div:nth-child(3) {
    margin-left: 10px;
  }
`;

const Dot = styled.div<{ active?: Boolean }>`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: 1px solid #000;
  background: ${props => (props.active ? "blue" : "#fff")};
`;

interface ArrowPositionUtilProps {
  leftArrow: { left: string | number; top: string | number };
  rightArrow: { right: string | number; top: string | number };
}

interface SliderProps {
  children: React.ReactElement[];
  singleItem?: Boolean;
  multipleItems?: Boolean;
  itemCount?: number;
  singleItemScroll?: Boolean;
  useDynamicWidth?: Boolean;
  hoveredArrows?: Boolean;
  arrowPositionUtils?: ArrowPositionUtilProps | undefined;
  useCustomArrows?: Boolean;
  customLeftArrow?: React.ReactElement;
  customRightArrow?: React.ReactElement;
  sliderDots?: Boolean;
  sliderDotsPosition?: string;
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
  sliderDotsPosition
}) => {
  const [mousePoints, setMousePoints] = useState({ start: 0, end: 0 });
  const [diff, setDIff] = useState(0);
  const [divHolded, setDivHolder] = useState(false);

  function left() {
    document.getElementById("container")!.scrollLeft -= document.getElementById(
      useDynamicWidth || !singleItemScroll ? "container" : "item"
    )!.offsetWidth;
  }

  function right() {
    document.getElementById("container")!.scrollLeft += document.getElementById(
      useDynamicWidth || !singleItemScroll ? "container" : "item"
    )!.offsetWidth;
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

  useEffect(() => {
    if (useCustomArrows && customLeftArrow) {
      let leftCustomArrowChild = document.getElementById("leftCustomArrow");
      if (leftCustomArrowChild && leftCustomArrowChild.childNodes) {
        leftCustomArrowChild.childNodes[0].addEventListener("click", () => {
          left();
        });
        console.log(leftCustomArrowChild.childNodes);
      }
    }
    if (useCustomArrows && customRightArrow) {
      let rightCustomArrowChild = document.getElementById("rightCustomArrow");
      if (rightCustomArrowChild && rightCustomArrowChild.childNodes) {
        rightCustomArrowChild.childNodes[0].addEventListener("click", () => {
          right();
        });
        console.log(rightCustomArrowChild.childNodes);
      }
    }
  }, []);

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

  return (
    <>
      {sliderDots && sliderDotsPosition === "top" ? (
        <DotsWrapper>
          <Dot active={true} />
          <Dot />
          <Dot />
        </DotsWrapper>
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
        <DotsWrapper>
          <Dot />
          <Dot active={true} />
          <Dot />
        </DotsWrapper>
      ) : null}
    </>
  );
};

// Single **
// Dynamic **
// Highlight middle, first (1, 2)
// Dynamic item widths

// Arrows -> Corner + Hovered **
// Dots -> Top, Bottom + Dynamic
// Dynamic navigation components
