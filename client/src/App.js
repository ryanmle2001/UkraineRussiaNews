import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { Box } from "@material-ui/core";
import "./App.css";
import axios from "axios";
function App() {
  const [cities, setCities] = useState([]);
  const [news, setNews] = useState({});

  const getDataApi = async () => {
    await axios
      .get(`http://localhost:5000/`)
      .then((res) => {
        const {
          data: {
            data: { cities, news },
          },
        } = res;
        setCities(cities);
        setNews(news);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataApi();

    console.log("app.js -> use effect triggered");
  }, []);

  return (
    <>
      <Router>
        <Box>
          <Navbar></Navbar>
          <div className="flex justify-end my-4 w-screen">
            <Box sx={{ mx: "auto", width: 200 }}>
              <Search cities={cities}></Search>
            </Box>
          </div>
          {console.log("app.js -> ", news)}
          {console.log("app.js -> ", cities)}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/map" element={<Map />} />
          </Routes>
        </Box>
      </Router>
    </>
  );
}

export default App;
