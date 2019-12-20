import React, { FC, SFC, useState, useEffect, Fragment } from "react";
import styled from "styled-components";

import { Dots } from "../Dots";

import LeftArrow from "../images/leftArrow.png";
import RightArrow from "../images/rightArrow.png";

import {
  SliderProps,
  SliderContainerProps,
  SliderItemWrapperProps,
  ArrowIconProps,
  CustomArrowProps
} from "./Types.d";

const SliderContainer = styled.div<SliderContainerProps>`
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

const SliderItemWrapper = styled.div<SliderItemWrapperProps>`
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

const LeftArrowIcon = styled.img<ArrowIconProps>`
  cursor: pointer;
  height: 20px;
  width: 20px;
  position: ${props => props.position || "relative"};
  ${props =>
    props.position === "absolute" ? props.hoveredArrowPosition : null};
`;

const RightArrowIcon = styled(LeftArrowIcon)``;

const CustomArrow = styled.div<CustomArrowProps>``;

export const Slider: FC<SliderProps> = ({
  children,
  singleItem,
  itemCount,
  singleItemScroll,
  useDynamicWidth,
  hoveredArrows,
  hoveredArrowPositionUtils,
  useCustomArrows,
  customLeftArrow,
  customRightArrow,
  sliderDots,
  sliderDotsPosition,
  dotStyles,
  useCustomDot,
  customDot
}) => {
  const configUtils = {
    itemWrapperWidth: singleItem
      ? "100%"
      : `${itemCount ? 100 / itemCount : 3}%`,
    containerDisplay: hoveredArrows ? "flex" : "grid",
    arrowPositions: hoveredArrows ? "absolute" : "inherit",
    leftArrowPosition: hoveredArrowPositionUtils!.leftArrow,
    rightArrowPosition: hoveredArrowPositionUtils!.rightArrow
  };

  const dotCount =
    children && singleItem
      ? children.length
      : itemCount
      ? Math.ceil(children.length / itemCount)
      : 1;
  const [dotsActiveFlags, setDotsActiveFlags] = useState(
    new Array(dotCount).fill(true, 0, 1).fill(false, 1, dotCount)
  );
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  function slideItems(slideDirection: string, selectedDotsDiff?: number): void {
    let dotIndex = activeSlideIndex;
    let offsetWidth = document.getElementById(
      useDynamicWidth || !singleItemScroll ? "container" : "item"
    )!.offsetWidth;
    let containerDiv = document.getElementById("container");
    let scrolableWidth = selectedDotsDiff
      ? offsetWidth * selectedDotsDiff
      : offsetWidth;
    if (slideDirection === "left") {
      containerDiv!.scrollLeft -= scrolableWidth;
      setActiveSlideIndex(activeSlideIndex - 1);
      dotIndex -= 1;
    } else if (slideDirection === "right") {
      containerDiv!.scrollLeft += scrolableWidth;
      setActiveSlideIndex(activeSlideIndex + 1);
      dotIndex += 1;
    }
    setDotActiveInactive(dotIndex);
  }

  function setDotActiveInactive(curSlideIndex: number): void {
    let dotFlags = dotsActiveFlags;
    dotFlags
      .fill(false, 0, dotsActiveFlags.length)
      .fill(true, curSlideIndex, curSlideIndex + 1);
    setDotsActiveFlags(dotFlags);
  }

  function dotClickSlide(dotIndex: number): void {
    if (
      activeSlideIndex + 1 === dotIndex ||
      activeSlideIndex - 1 === dotIndex
    ) {
      activeSlideIndex < dotIndex ? slideItems("right") : slideItems("left");
    } else {
      activeSlideIndex < dotIndex
        ? slideItems("right", Math.abs(activeSlideIndex - dotIndex))
        : slideItems("left", Math.abs(activeSlideIndex - dotIndex));
    }
    setActiveSlideIndex(dotIndex);
    setDotActiveInactive(dotIndex);
  }

  useEffect(() => {
    if (useCustomArrows && customLeftArrow) {
      let leftCustomArrowChild = document.getElementById("leftCustomArrow");
      if (leftCustomArrowChild && leftCustomArrowChild.childNodes) {
        leftCustomArrowChild.childNodes[0].addEventListener("click", () => {
          slideItems("left");
        });
      }
    }
    if (useCustomArrows && customRightArrow) {
      let rightCustomArrowChild = document.getElementById("rightCustomArrow");
      if (rightCustomArrowChild && rightCustomArrowChild.childNodes) {
        rightCustomArrowChild.childNodes[0].addEventListener("click", () => {
          slideItems("right");
        });
      }
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
            onClick={() => {
              slideItems("left");
            }}
            position={configUtils.arrowPositions}
            hoveredArrowPosition={JSON.stringify(configUtils.leftArrowPosition)
              .replace(/,/g, ";")
              .replace(/{}|"/g, "")}
          />
        )}
        <SliderWrapper id="container">
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
            onClick={() => {
              slideItems("right");
            }}
            position={configUtils.arrowPositions}
            hoveredArrowPosition={JSON.stringify(configUtils.rightArrowPosition)
              .replace(/,/g, ";")
              .replace(/{}|"/g, "")}
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

// Highlight middle, first (1, 2)
//
