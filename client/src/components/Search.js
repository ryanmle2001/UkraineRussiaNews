import React, { useEffect, useState } from "react";
import { Box, TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";

const Search = ({ cities, setUserCity }) => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const handlePush = () => {
    navigate(`/?${selected}`, { state: { city: selected } });
  };

  useEffect(() => {
    handlePush();
  }, [selected]);

  return (
    <Box>
      <Autocomplete
        onChange={(event, newValue) => {
          setSelected(newValue);
        }}
        id="controllable-states-demo"
        options={cities}
        sx={{ width: 400 }}
        renderInput={(params) => <TextField {...params} label="Search News" />}
      />
    </Box>
  );
};

export default Search;
