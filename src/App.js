import Header from "./Components/Header"
import Footer from "./Components/Footer";
import MainContent from "./Components/MainContent";
import './App.css';
import Box from '@material-ui/core/Box';

function App() {
  return (

    <Box className="App" >
      <Header />
      <MainContent />
      <Footer />

    </Box>

  );
}

export default App;
