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
  const [cityInfo, setCityInfo] = useState([]);
  const [news, setNews] = useState({});

  // Collect user input
  const [userCity, setUserCity] = useState("");

  const getDataApi = async ({ userCity }) => {
    await axios
      .get(`http://localhost:5000/${userCity}`)
      .then((res) => {
        const {
          data: {
            data: { cities, news, city_info },
          },
        } = res;
        setCities(cities);
        setNews(news);
        setCityInfo(city_info);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataApi(userCity);

    console.log("app.js -> use effect triggered");
  }, []);

  useEffect(() => {
    console.log("app.js -> use effect triggered userCity");
  }, []);

  return (
    <>
      <Router>
        <Box>
          <Navbar></Navbar>
          <div className="flex justify-end my-4 w-screen">
            <Box sx={{ mx: "auto", width: 200 }}>
              <Search
                cities={cities}
                setUserCity={setUserCity}
                userCity={userCity}
              ></Search>
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
