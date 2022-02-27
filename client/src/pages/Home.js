import News from "../components/News";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import PacmanLoader from "react-spinners/PacmanLoader";

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDataApi = async () => {
    await axios
      .get(`http://localhost:5000/`)
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

    console.log("home -> use effect triggered");
  }, []);

  return (
    <Box>
      {console.log("data: ", news)}
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
