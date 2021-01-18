import React from "react";
import { HORIZONTAL_DIRECTION, VERTICAL_DIRECTION } from "../../constants";

import "./Box.css";

const getPane = (transform, index) => {
  return (
    <div className={`pane pane-${index}`} key={index} style={{ transform }}>
      {index}
    </div>
  );
};

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotateY: [0, 90, 180, -90, 90, -90],
      rotateX: [180, -170, 180, -190, 100, -100],
      rotateZ: [100, 0, -10, 0, 0, 0],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.horizontalDirection !== prevProps.horizontalDirection ||
      this.props.mouseX !== prevProps.mouseX
    ) {
      this.setState((prevState, prevProps) => {
        const rotateZ = [...prevState.rotateZ];
        const rotateY = prevState.rotateY.map((v) => {
          if (this.props.horizontalDirection === HORIZONTAL_DIRECTION.RIGHT) {
            return v + 1;
          } else if (
            this.props.horizontalDirection === HORIZONTAL_DIRECTION.LEFT
          ) {
            return v - 1;
          }
          return v;
        });
        const rotateX = prevState.rotateX.map((v, i) => {
          if (i === 3 || i === 5) {
            return this.props.verticalDirection === VERTICAL_DIRECTION.UP
              ? v + 1
              : v - 1;
          }
          if (i === 1 || i === 4) {
            return this.props.verticalDirection === VERTICAL_DIRECTION.UP
              ? v - 1
              : v + 1;
          }
          if (i === 0) {
            rotateZ[0] =
              this.props.verticalDirection === VERTICAL_DIRECTION.UP
                ? rotateZ[0] - 1
                : rotateZ[0] + 1;
          }
          if (i === 2) {
            rotateZ[2] =
              this.props.verticalDirection === VERTICAL_DIRECTION.UP
                ? rotateZ[2] + 1
                : rotateZ[2] - 1;
          }
          return v;
        });

        return {
          ...prevState,
          rotateY,
          rotateX,
          rotateZ,
        };
      });
    }
  }

  getTransformsArr = () => {
    return [
      `rotateY(${this.state.rotateY[0]}deg) rotateX(${this.state.rotateX[0]}deg) rotateZ(${this.state.rotateZ[0]}deg) translateZ(100px)`,
      `rotateY(${this.state.rotateY[1]}deg) rotateX(${this.state.rotateX[1]}deg) rotateZ(${this.state.rotateZ[1]}deg) translateZ(100px)`,
      `rotateY(${this.state.rotateY[2]}deg) rotateX(${this.state.rotateX[2]}deg) rotateZ(${this.state.rotateZ[2]}deg) translateZ(100px)`,
      `rotateY(${this.state.rotateY[3]}deg) rotateX(${this.state.rotateX[3]}deg) rotateZ(${this.state.rotateZ[3]}deg) translateZ(100px)`,
      `rotateY(${this.state.rotateY[4]}deg) rotateX(${this.state.rotateX[4]}deg) rotateZ(${this.state.rotateZ[4]}deg) translateZ(100px)`,
      `rotateY(${this.state.rotateY[5]}deg) rotateX(${this.state.rotateX[5]}deg) rotateZ(${this.state.rotateZ[5]}deg) translateZ(100px)`,
    ];
  };

  render() {
    return (
      <div className="box">
        {this.getTransformsArr().map((value, index) => getPane(value, index))}
      </div>
    );
  }
}

export default Box;
