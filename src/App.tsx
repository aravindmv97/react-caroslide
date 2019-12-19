import React from "react";

import { Slider } from "./components/Slider";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Slider
        useCustomArrows={true}
        customLeftArrow={<div>LEFT</div>}
        customRightArrow={<div>RIGHT</div>}
        singleItem={true}
        singleItemScroll={false}
        hoveredArrows={true}
        arrowPositionUtils={{
          leftArrow: { left: 0, top: "50%" },
          rightArrow: { right: 0, top: "50%" }
        }}
        useDynamicWidth={true}
        sliderDots={true}
        sliderDotsPosition="top"
        dotStyles={{ color: "red", margin: "20px 0" }}
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </Slider>
    </div>
  );
};

export default App;
