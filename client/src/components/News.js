import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const News = ({
  data = [
    {
      title: "",
      text: "",
      img: "",
    },
  ],
}) => {
  // const [newsFeed, SetNewsFeed] = useState(data);

  // useEffect(() => {

  // }, [third])

  return (
    <>
      <div className="flex flex-col w-2/3 justify-center gap-y-5 p-4">
        {data.map((newsItem, i) => (
          <Card>
            {newsItem.img && (
              <CardMedia
                component="img"
                height="140"
                src={newsItem.img}
                alt="news image"
              />
            )}

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {newsItem.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {newsItem.text}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

export default News;
