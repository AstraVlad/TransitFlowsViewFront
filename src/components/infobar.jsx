//import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Switch } from '@mui/material';

export default function InfoBar({ metadata, themeSwitcher, selectedFile }) {

    return (
        <AppBar position="sticky">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="p">
                    {selectedFile}
                </Typography>
                <Switch
                    id='theme-switch'
                    onChange={themeSwitcher}
                    color='secondary'
                />
            </Toolbar>
        </AppBar>
    )
}