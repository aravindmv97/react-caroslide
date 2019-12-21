import React from "react";

import { Slider } from "./components/Slider";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Slider
        customLeftArrow={<div>LEFT</div>}
        itemCount={3}
        hoveredArrows={true}
        hoveredArrowPositionUtils={{
          leftArrow: { left: 0, top: "50%", right: "auto", bottom: "auto" },
          rightArrow: { left: "auto", top: "50%", right: 0, bottom: "auto" }
        }}
        sliderDots={true}
        sliderDotsPosition="top"
        dotStyles={{ color: "blue" }}
        customDot={{ inactive: <InactiveDot />, active: <ActiveDot /> }}
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
      </Slider>
    </div>
  );
};

const ActiveDot = () => {
  return (
    <div style={{ height: "10px", width: "10px", background: "green" }}></div>
  );
};

const InactiveDot = () => {
  return (
    <div
      style={{
        height: "10px",
        width: "10px",
        background: "white",
        border: "1px solid #000"
      }}
    ></div>
  );
};

export default App;
