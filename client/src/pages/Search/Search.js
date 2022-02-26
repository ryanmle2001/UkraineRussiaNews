import React, { useState } from "react";
import { Box, TextField } from "@material-ui/core";
import Autocomplete from '@mui/material/Autocomplete';

const options = ["Option 1", "Option 2"];

const Search = () => {
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Box>
      <Autocomplete
        value=""
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search News" />}
      />
    </Box>
  );
};

export default Search;
