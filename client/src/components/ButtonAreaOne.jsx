import React from "react";

const ButtonAreaOne = (props) => (
  <div>
    {props.authenticated ? (
      <button className="gameButton smButton" onClick={props.handleSaveButton}>Save Game</button>
    ) : (
      <button className="gameButton smButton" onClick={props.viewUserScreenToggle}>Log In</button>
    )}
    <button className="gameButton smButton" onClick={props.viewHelpToggle}>Help</button>
  </div>
);

export default ButtonAreaOne;
