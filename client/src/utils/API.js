import axios from "axios";

//methods for interacting with API routes
export default {
  login: userData => 
    axios.post("/auth/login",  userData),
  signUp: userData => 
  	axios.post('/auth/signup', userData),
  dashboard: token =>
    axios.get('/api/dashboard', {headers: {Authorization: `bearer ${token}`}}),
  saveGame: (saveData, token) =>
    axios.post(
      '/api/saveStates/',
      saveData,
      {headers: {Authorization: `bearer ${token}`}}
    ),
  loadGame: (gameID, token) =>
    axios.get(`/api/saveStates/${gameID}`, {headers: {Authorization: `bearer ${token}`}})
};
