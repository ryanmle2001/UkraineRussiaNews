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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataApi();
  }, [city]);

  useEffect(() => {
    if (location.state?.city) {
      setCity(location.state.city);
    } else {
      setCity("");
    }
  }, [location.state]);

  useEffect(() => {}, [news]);

  return (
    <Box>
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
