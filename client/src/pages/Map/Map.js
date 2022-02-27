import React, { Component, useState, useEffect } from 'react';
import   GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery , Box, Card, CardContent,CardActions, Button} from "@material-ui/core";
import mapStyles from "./MapStyles";
import useStyles from "./styles";
import axios from 'axios';

const defaultProps = {

  


  center: {
    lat: 48.3794,
    lng: 31.1656
  },
  zoom: 11
};

const Map = () => {
  const [cityInfo, setCityInfo] = useState();
  
  const getDataApi = async () => {
    await axios
      .get(`http://localhost:5000`)
      .then((res) => {
        const {
          data: {
            data: { city_info },
          },
        } = res;
       
        setCityInfo(city_info);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataApi();
  }, []);
  // For styling
  
  const city = cityInfo ? Object.keys(cityInfo).map((key) => cityInfo[key]) : cityInfo;
  
  
  const classes = useStyles();
  // If the width of the screen is below 600px turn this to true
  const isMobile = useMediaQuery("(min-width:600px)");
  return (
    <div>
      <div className={classes.mapContainer}>
        {/* Google map react will show you when something change */}
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCDTDxXsYoWWENC22m1cXqmg3nOqQW0go4",
            language: "en",
          }}
          defaultCenter={defaultProps.center}
          center={defaultProps.center}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        
       
        >
      {city?.map((place) => {  
           <div
            lat={place?.lat}
            lng={place?.lng}
            key={1}
           >
             <Box bgcolor='blue' width="5" height="10"></Box>
             {console.log(place?.name)}

           </div>
          })}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;