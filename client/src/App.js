import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { Box } from "@material-ui/core";
import ClockLoader from "react-spinners/ClockLoader";
import "./App.css";
import axios from "axios";


function App() {
  // Pouring data
  const [loading, setLoading] = useState(false);

  const [cities, setCities] = useState([]);
  const [cityInfo, setCityInfo] = useState([]);
  const [news, setNews] = useState({});

  // Collect user input
  const [userCity, setUserCity] = useState("");


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => {};
  }, []);



  

  const getDataApi = async ({userCity}) => {
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

console.log(userCity);
  return (
    <>
      {loading ? (
        <Box sx={{ position: "fixed", top: "10%", left: "30%" }}>
          <ClockLoader
            className="spinner"
            size={500}
            color={"black"}
            loading={loading}
          />
        </Box>
      ) : (
        <Router>
          <Box>
            <Navbar></Navbar>
            <br />
            <Box sx={{ mx: "auto", width: 200 }}>
              <Search cities={cities} setUserCity={setUserCity} userCity={userCity}></Search>
            </Box>
            <br />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/map" element={<Map />} />
            </Routes>
          </Box>
        </Router>
      )}
    </>
  );
}

export default App;
