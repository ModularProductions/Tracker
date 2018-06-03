import React from "react";
import Moment from "react-moment";

const SingleSavedGame = (props) => (
  <div>
    <p className="savedGameName"><strong>First Game</strong></p>
    <p>Location: {props.gameData.playerLocation}</p>
    <p>Moves: {props.gameData.moveCount}, Saved at: <Moment format="hh:mma MMM Do, 'YY">{props.dateSaved}</Moment>.</p>
    {/* {props.children} */}
    <button onClick={() => props.handleDeleteButton(props.gameID)}>Delete</button>
  </div>
);


export default SingleSavedGame;
