import React, { Component } from "react";
import "./App.css";

import Box from "./components/box";

import { HORIZONTAL_DIRECTION, VERTICAL_DIRECTION } from "./constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horizontalDirection: HORIZONTAL_DIRECTION.LEFT,
      verticalDirection: VERTICAL_DIRECTION.DOWN,
      mouseX: 0,
      mouseY: 0,
    };
  }
  onMouseMove = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    this.setState((prevState, prevProps) => {
      const horizontalDirection =
        mouseX < prevState.mouseX
          ? HORIZONTAL_DIRECTION.LEFT
          : HORIZONTAL_DIRECTION.RIGHT;
      const verticalDirection =
        mouseY < prevState.mouseY
          ? VERTICAL_DIRECTION.UP
          : VERTICAL_DIRECTION.DOWN;
      return {
        ...prevState,
        horizontalDirection,
        verticalDirection,
        mouseX,
        mouseY,
      };
    });
  };
  render() {
    return (
      <div className="app" onMouseMove={this.onMouseMove}>
        <header className="app-header">
          <h1>{"3D Box"}</h1>
        </header>
        <main>
          <Box
            verticalDirection={this.state.verticalDirection}
            horizontalDirection={this.state.horizontalDirection}
            mouseX={this.state.mouseX}
            mouseY={this.state.mouseY}
          />
        </main>
      </div>
    );
  }
}

export default App;
