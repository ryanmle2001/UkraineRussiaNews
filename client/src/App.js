import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar/Navbar";
import Search from "./pages/Search/Search";
import {Box} from '@material-ui/core';


function App() {
  return (
    <>
      <Navbar></Navbar>
      <br />
      <Box  sx={{ mx: "auto", width: 200 }} >
        <Search></Search>
      </Box>
      <br />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
