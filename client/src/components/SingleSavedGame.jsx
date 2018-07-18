import React from "react";
import Moment from "react-moment";

const SingleSavedGame = (props) => (
  <li>
    <div className="savedGameName"><strong>First Game</strong></div>
    <div className="savedGameLocation">Location: {props.gameData.playerLocation}</div>
    <div className="savedGameMoves">Moves: {props.gameData.moveCount}</div>
    <div className="savedGameTime">Saved at: <Moment format="hh:mma MMM Do, 'YY">{props.dateSaved}</Moment></div>
    {/* {props.children} */}
    <div className="deleteSaved" onClick={() => props.handleDeleteButton(props.gameID)}>Delete</div>
  </li>
);

export default SingleSavedGame;
