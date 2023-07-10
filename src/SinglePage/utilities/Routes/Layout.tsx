import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import RouterConfig from './Routes';
import { List, ListItem, ListItemText } from '@mui/material';


const Layout = () => {
    const location = useLocation();

    return (
        <>
            <nav className='navBar'>
                <List component="ul">
                    {RouterConfig.map((route, i) => (
                        <ListItem
                            key={i}
                            button
                            component={Link}
                            to={route.path}
                            className={location.pathname === route.path ? 'activeLink' : ''}
                        >
                            <ListItemText primary={route.sidebarName} />
                        </ListItem>
                    ))}
                </List>
            </nav>
        </>
    );
};

export default Layout;
