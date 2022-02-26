import React from "react";
import News from "../components/News";

const news_data = [
  {
    title: "test title1",
    text: "test text1",
    // img: "",
  },
  {
    title: "test title2",
    text: "test text2",
    img: "",
  },
  {
    title: "test title3",
    text: "test text3",
    img: "https://dynaimage.cdn.cnn.com/cnn/digital-images/org/e878d0ed-bc0c-45fc-81cc-1ac9ead0eeb1.png",
  },
  {
    title: "test title4",
    text: "test text4",
    img: "https://dynaimage.cdn.cnn.com/cnn/digital-images/org/e878d0ed-bc0c-45fc-81cc-1ac9ead0eeb1.png",
  },
];

const Home = () => {
  return (
    <div>
      <div className="flex justify-center">
        <News data={news_data} />
      </div>
      <scrap />
    </div>
  );
};

export default Home;
