import React, { useState } from "react";
import { Box, TextField } from "@material-ui/core";
import Autocomplete from '@mui/material/Autocomplete';

const options = ["Option 1", "Option 2"];

const Search = ({cities, setUserCity, userCity}) => {
  const [value, setValue] = useState(cities);
  const [inputValue, setInputValue] = React.useState("");
  
  // const new_cities = value?.map(city => city.charAt(0).toUpperCase() + city.slice(1));


  return (
    <Box>
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        setUserCity(newInputValue);
      }}
      id="controllable-states-demo"
      options={cities }
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search News" />}
    />
  </Box>
  );
};

export default Search;
