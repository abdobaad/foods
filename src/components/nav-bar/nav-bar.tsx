import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styles from '@/styles/Home.module.css'
import { NavBarTypes } from '../types';

const NavBar: React.FC<NavBarTypes> = ({Compare,items,showDiff}) => {
    const CompareFood = () => Compare();
   
    return (
        <AppBar className={styles.navbar} color="inherit" position="static">
        <Toolbar className={styles.toolbar}>
            <div className={styles.toolbar_left}>
              <IconButton className={styles.burger_icon} edge="start" color="inherit" aria-label="menu">
                 <MenuIcon />
              </IconButton>
              {items.length > 0 &&( 
                <Typography variant="h6" >
                  {items.length === 1 ? '1 product selected' : `${items.length} products selected` }
                </Typography>
                )} 
              
            </div>
            <Button onClick={()=> CompareFood()} variant="contained" color={showDiff ?"primary" : "default"} disabled={ items.length < 2 }>
               {showDiff ? 
                "select other 2 products"
                 : 
                items.length < 2 ? "select 2 products to compare" : "compare products"} 
            </Button>
        </Toolbar>
    </AppBar>
    );
};

export default NavBar;