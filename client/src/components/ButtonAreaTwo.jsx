import React from "react";

const ButtonAreaTwo = (props) => (
  <div>
    <button className="gameButton smButton" onClick={props.viewAboutToggle}>About</button>
    <button className="gameButton smButton" onClick={props.viewUserScreenToggle}>Exit</button>
  </div>
);

export default ButtonAreaTwo;
