import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar/Navbar";
import Search from "./pages/Search/Search";
import { Box } from "@material-ui/core";
import Map from "./components/Map/Map";
import ClockLoader from "react-spinners/ClockLoader";
import "./App.css";
import axios from "axios";
function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => {};
  }, []);

  const [data, setData] = useState();
  const [cities, setCities] = useState([]);
  const [news, setNews] = useState({});
  console.log(data);
  
  const getDataApi = async () => {
    await axios
      .get(`http://localhost:5000/`)
      .then((res) => {
        const {data: {data: {cities, news}}} = res;
        setCities(cities);
        setNews(news);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataApi();

    console.log("use effect triggered");
  }, []);

  return (
    <>
      {loading ? (
        <Box sx={{position: 'fixed', top:'10%', left: '30%'}}>
          <ClockLoader
            className="spinner"
            size={500}
            color={"black"}
            loading={loading}
          />
        </Box>
      ) : (
        <Box>
          <Navbar></Navbar>
          <br />
          <Box sx={{ mx: "auto", width: 200 }}>
            <Search cities={cities}></Search>
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
