import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { AiOutlineMenu } from "react-icons/ai";
import { Spacer } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FontLink from "./FontLink";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {BsFillMapFill} from 'react-icons/bs'
// import "../../App.css";


const Navbar = () => {
 
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Open navbar
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar color="transparent" position="static" sx={{ py: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters color="transparent">
          <Typography variant="h3" color="cyan" noWrap color="black" sx={{ mx: "auto" }}>
            <Link to="/">UMonitor</Link>
          </Typography>

          <br />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="open">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AiOutlineMenu />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link to="/map">
                <MenuItem key={"map"} spacing={2} onClick={handleCloseUserMenu}>
                <BsFillMapFill color="blue" />  <Typography sx={{marginLeft: 2}} component={Link} to="/map" textAlign="center">Map</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
