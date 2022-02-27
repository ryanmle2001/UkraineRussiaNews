import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar/Navbar";
import Search from "./pages/Search/Search";
import { Box } from "@material-ui/core";
import Map from "./components/Map/Map";
import ClockLoader from "react-spinners/ClockLoader";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => {};
  }, []);

  return (
    <>
      {loading ? (
        <Box sx={{position: 'fixed', top:'50%', left: '50%'}}>
          <ClockLoader
            className="spinner"
            size={150}
            color={"black"}
            loading={loading}
          />
        </Box>
      ) : (
        <Box>
          <Navbar></Navbar>
          <br />
          <Box sx={{ mx: "auto", width: 200 }}>
            <Search></Search>
          </Box>
          <br />
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
            </Routes>
            <Routes>
              <Route exact path="/map" element={<Map />} />
            </Routes>
          </Router>
        </Box>
      )}
    </>
  );
}

export default App;
