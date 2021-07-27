import Header from "./Components/Header"
import Footer from "./Components/Footer";
import MainContent from "./Components/MainContent";
import './App.css';
import Box from '@material-ui/core/Box';
import MoviePage from "./Components/MoviePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FavoritePage from "./Components/FavoritePage";


function App() {
  return (
    <Router>
      <Box className="App" >
        <Header />
        <Switch>
          <Route exact path="/">
            <MainContent />
          </Route>
          <Route path="/movie/:imdbID" >
            <MoviePage />
          </Route>
          <Route path='/favorites'>
            <FavoritePage />
          </Route>
        </Switch>
        <Footer />

      </Box>
    </Router >

  );
}

export default App;
