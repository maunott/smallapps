import { useState } from 'react';
import {AppBar ,IconButton,Toolbar, CssBaseline, Drawer, List, ListItem, ListItemText, ListItemIcon} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Link} from 'react-router-dom';
function Valikko() {

    const [naytaValikko, setNaytaValikko] = useState(false);

    return (
        <CssBaseline>
            <AppBar position="static">
                <Toolbar>
                <IconButton edge='start' 
                            color='inherit'
                            onClick={() => {setNaytaValikko(true)}}>
                    <MenuIcon></MenuIcon>
                </IconButton>
                <Drawer open={naytaValikko}
                        onClick={() => {setNaytaValikko(false)}}>
                <List style={{
                    width : 220,
                    marginTop : 50
                }}
                onClick={() => {setNaytaValikko(false)}}>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon></HomeIcon>
                        </ListItemIcon>
                        <ListItemText primary="Etusivu" />
                    </ListItem>
                    <ListItem button component={Link} to="/saannot">
                        <ListItemIcon>
                           <InfoIcon></InfoIcon>
                        </ListItemIcon>
                        <ListItemText primary="Säännöt" />
                    </ListItem>
                    <ListItem button component={Link} to="/ilmoittaudu">
                        <ListItemIcon>
                           <BorderColorIcon></BorderColorIcon>
                        </ListItemIcon>
                        <ListItemText primary="Ilmoittaudu" />
                    </ListItem>
                </List>
                </Drawer>
                </Toolbar>
                
            </AppBar>
        </CssBaseline>
    )
}

export default Valikko;