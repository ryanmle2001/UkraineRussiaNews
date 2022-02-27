import News from "../components/News";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [news, setNews] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const getDataApi = async () => {
    await axios
      .get(`http://localhost:5000/${city}`)
      .then((res) => {
        const {
          data: {
            data: { news },
          },
        } = res;
        setNews(news);
        setLoading(false);
        console.log("getDataApi -> ", city);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataApi();

    console.log("home -> use effect triggered", city);
  }, [city]);

  useEffect(() => {
    setCity(location.state.city);
    console.log("home -> state changed", city);
  }, [location.state]);

  useEffect(() => {}, [news]);

  return (
    <Box>
      {console.log("Home render", city, news)}
      <div className="flex justify-center">
        {loading ? (
          <div className="mt-5">
            <PacmanLoader />
          </div>
        ) : (
          <News data={news} />
        )}
      </div>
    </Box>
  );
};

export default Home;
