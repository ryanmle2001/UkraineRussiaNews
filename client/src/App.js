import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@material-ui/core";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Navbar from "./components/Navbar";
import Search from "./components/Search";

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <br />
        <Box sx={{ mx: "auto", width: 200 }}>
          <Search></Search>
        </Box>
        <br />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/map" element={<Map />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
