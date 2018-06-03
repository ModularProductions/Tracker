import React from "react";
import Auth from "../utils/Auth";
import API from "../utils/API";
import SingleSavedGame from "./SingleSavedGame";

class SavedGames extends React.Component {

  state = { savedGames: [] };

  noResultsStyle = {
    textAlign: "center"
  };

  // retrieves user ID from /dashboard call, then retrieves all games with that ID attached
  getGames = () => {
    API.dashboard(Auth.getToken())
    .then(res => {
      const user = res.data.user._id;
      API.getSavedGames(user, Auth.getToken())
        .then(res => 
          {
            this.setState({ savedGames: res.data })
          }
        )
        .catch(err => console.log("getGames() API error =", err))
        ;
      }
    );
  }
  
  handleDeleteButton = (data) => {
    API.dashboard(Auth.getToken())
    .then(res => {
      const user = res.data.user._id;
      console.log("handleDeleteButton() data =", data);
      API.deleteSavedGame(data, Auth.getToken())
        .then(res => this.getGames())
        .catch(err => console.log("handleDeleteButton() API error =", err))
      }
    );
  }

  componentDidMount() {
    this.getGames();
  }

  render() {
    return (
      <div className="savedGames">
        {this.state.savedGames.length ? (
          <ul>
            {this.state.savedGames.map((game) => (
              <SingleSavedGame
                key={game._id} {...game}
                gameID={game._id}
                handleDeleteButton={this.handleDeleteButton}
              />
              // <button onClick={() => this.handleDeleteButton(game._id)}>Delete</button>
              // </SingleSavedGame>
            ))}
          </ul>
        ) : (
          <p style={this.noResultsStyle}>You have no saved games.</p>
        )}
      </div>
    )
  }
};

export default SavedGames;
