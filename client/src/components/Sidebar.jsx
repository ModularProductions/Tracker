import React from "react";
import Inventory from "./Inventory.jsx";
import Equipment from "./Equipment.jsx";
import Statistics from "./Statistics.jsx";

const Sidebar = (props) => {
  if (props.showUserScreen) {
    return (
      <div>
        <button>Load Game</button>
        <p>load game buttons here</p>
        <button onClick={props.viewUserScreenToggle}>Return to Game</button>
        <button onClick={props.logOutUser}>Log Out</button>
      </div>
    )
  } else {
    return (
      <div>
        <Inventory inventory={props.inventory}/>
        <Equipment 
            wielded={props.wielded} 
            head={props.head} 
            body={props.body} 
            arms={props.arms} 
            legs={props.legs}
          />
        <Statistics
          health={props.health}
          attack={props.attack} 
          defense={props.defense} 
          moveCount={props.moveCount}
        />
      </div>
    )
  }
};

export default Sidebar;
