//import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Switch } from '@mui/material';
import MainMenu from './ui/mainmenu';

export default function InfoBar({ metadata, themeSwitcher, selectedFile }) {

    return (
        <AppBar position="sticky">
            <Toolbar variant="dense">
                <MainMenu />
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