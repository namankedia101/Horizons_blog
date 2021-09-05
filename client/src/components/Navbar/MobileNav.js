import React, {useState, useEffect} from 'react';
import {Slide, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, Tooltip, useScrollTrigger} from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import AddCircleIcon from "@material-ui/icons/AddCircle"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import useStyles from "./styles";
import decode from "jwt-decode";

const MobileNav = (props) => {
            const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
            const [isDrawerOpen, setIsDrawerOpen] = useState(false);
            const creators = ["kediaarts@gmail.com","rhythm7001@gmail.com","jayverma878@gmail.com","vsviveksonu@gmail.com"];
   
            const classes = useStyles(props);
            const dispatch = useDispatch();
            const history = useHistory();
            const location = useLocation();
            const trigger = useScrollTrigger();

            const logout =()=>{
                dispatch({type:"LOGOUT"});
                history.push("/auth");
                setUser(null);
            }
        
            useEffect(() => {
                const token = user?.token;
            
                if (token) {
                  const decodedToken = decode(token);
            
                  if (decodedToken.exp * 1000 < new Date().getTime()) logout();
                }
            
                setUser(JSON.parse(localStorage.getItem('profile')));
              }, [location]);

            return (
                <Slide appear={false} direction="down" in={!trigger}>
              <AppBar className={classes.appBar} color="transparent">
                <Toolbar>
                <Link to="/" className={classes.brand} color="none">
                    <Typography>
                        HORIZONS
                    </Typography>
                </Link>
                </Toolbar>
                <Toolbar>
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  >
                    <MenuIcon className={classes.menuIcon}/>
                  </IconButton>
                  <Drawer anchor="right" classes={{paper: classes.MuiDrawer}} open={isDrawerOpen} onClose={() => setIsDrawerOpen(!isDrawerOpen)}>
                    <List >
                      <ListItem button>
                      {creators.map((creator)=>{
                  if(creator===user?.result?.email)
                   return  <Link to="/newPost" key={user?.result?.googleId} className={classes.dItems}>
                        <Tooltip title="Create New Blog">
                           <AddCircleIcon/>
                           </Tooltip>
                        </Link>
                 })}
                      </ListItem>
          
                      <ListItem button>
                      <Link to="/about" className={classes.dItems}>
                    <Typography>
                        About
                    </Typography>
                </Link>
                      </ListItem>
          
                      <ListItem button>
                      {user?.result ?
                    (<Link to="#" className={classes.dItems} onClick={logout}>
                    <Typography>
                        Sign Out
                    </Typography>
                </Link>):(<Link to="/auth" className={classes.dItems}>
                    <Typography>
                        Sign In
                    </Typography>
                </Link>)
                }
                      </ListItem>
                    </List>
                  </Drawer>
                </Toolbar>
              </AppBar>
              </Slide>
            )
          }
    

export default MobileNav
