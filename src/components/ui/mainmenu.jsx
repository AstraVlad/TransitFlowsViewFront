//import * as React from 'react';
import { useState } from 'react';
//import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { DataContext } from '../../contexts/datacontext';
import { useContext } from 'react';

export default function MainMenu() {
  const { setSelectedFile } = useContext(DataContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenProject = () => {
    setAnchorEl(null);
    setSelectedFile('')
  };

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleOpenProject}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOpenProject}>Сменить проект</MenuItem>
      </Menu>
    </div>
  );
}