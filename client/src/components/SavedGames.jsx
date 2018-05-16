import React from "react";

const SavedGames = (props) => (
  <div>
    {props.authenticated ? (
      <p>Saved games here</p>
    ) : (
      <p>You need to sign in to save games!</p>
    )}
  </div>
);

export default SavedGames;
