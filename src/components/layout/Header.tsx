import { Avatar, Toolbar, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { SearchInput } from "../SearchInput";
import { theme } from "./theme";
import React, { useState } from 'react';

export const Header = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {setAnchorEl(event.currentTarget);};
  const handleClose = () => {setAnchorEl(null);};

  return (
    <Toolbar
      sx={{
        justifyContent: "space-between",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <NavLink to={"/"}>
        <Typography
          variant="h1"
          sx={{ color: theme.palette.background.default }}
        >
          Seilzugangstechnik
        </Typography>
      </NavLink>

      <div className="flex gap-32 max-h-14">
        <SearchInput />
        <div className="rounded-full bg-white p-1">
          <IconButton onClick={handleClick} sx={{ height: '45px', width: '45px' }}>
            <Avatar src="images/avatar.png" sx={{ height: '40px', width: '40px', overflow: 'visible' }}/>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem component={NavLink} to="/home" onClick={handleClose}>Home</MenuItem>
            <MenuItem component={NavLink} to="/settings" onClick={handleClose}>Einstellungen</MenuItem>
            <MenuItem onClick={handleClose}>Ausloggen</MenuItem>
          </Menu>
        </div>
      </div>
    </Toolbar>
  );
};
