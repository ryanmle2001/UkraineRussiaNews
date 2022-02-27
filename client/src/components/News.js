import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const News = ({
  data = [
    {
      body: "",
      city: "",
      date: "",
      header: "",
      image: null,
      newsId: "",
      url: "",
    },
  ],
}) => {
  useEffect(() => {
    console.log("News -> ", data);
  }, [data]);

  return (
    <>
      <div className="flex flex-col w-2/3 justify-center gap-y-5 px-4 py-7">
        {data.map((newsItem, i) => (
          <Card key={newsItem.newsId}>
            {newsItem.image && (
              <a
                href={newsItem.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-wrap justify-center pt-4"
              >
                <CardMedia
                  className="max-w-[75%] h-auto"
                  component="img"
                  src={newsItem.image}
                  alt="news image"
                />
              </a>
            )}

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {newsItem.header}
              </Typography>
              <Typography gutterBottom variant="h7" component="div">
                {newsItem.city} - {newsItem.date.split(".")[0]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {newsItem.body}
              </Typography>
            </CardContent>
            <CardActions>
              {/* <Button size="small">Share</Button> */}
              <Button size="small">
                <a
                  href={newsItem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-4"
                >
                  Learn More
                </a>
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

export default News;
