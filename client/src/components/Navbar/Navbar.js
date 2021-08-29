import React, {useState,useEffect} from "react";
import {AppBar, Toolbar, Typography, Slide, useScrollTrigger, Tooltip, useMediaQuery} from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useDispatch} from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import MobileNav from "./MobileNav";

const Navbar = (props)=>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
   // const {currentPage} = useSelector((state) => (state.posts));
   const matches = useMediaQuery('(max-width:768px)');

    const creators = ["kediaarts@gmail.com","rhythmbhatia28@gmail.com","jayverma878@gmail.com","vsviveksonu@gmail.com"];

    const classes = useStyles(props);
    const trigger = useScrollTrigger();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

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

    return(
        <>
        {matches ? <MobileNav color={props.color}/>:(<Slide appear={false} direction="down" in={!trigger}><AppBar className={classes.appBar} color="transparent">
            <Toolbar>
                <Link to="/" className={classes.brand} color="none">
                    <Typography>
                        HORIZONS
                    </Typography>
                </Link>
                </Toolbar>
                <Toolbar>
                {creators.map((creator)=>{
                  if(creator===user?.result?.email)
                   return  <Link to="/newPost" key={user?.result?.googleId} className={classes.items}>
                        <Tooltip title="Create New Blog">
                           <AddCircleIcon/>
                           </Tooltip>
                        </Link>
                 })}
                <Link to="/about" className={classes.items}>
                    <Typography>
                        About
                    </Typography>
                </Link>
                {/* {<Link to="/shop"  className={classes.items}>
                    <Typography>
                        Shop
                    </Typography>
                </Link>} */}
                {user?.result ?
                    (<Link to="#" className={classes.items} onClick={logout}>
                    <Typography>
                        Log Out
                    </Typography>
                </Link>):(<Link to="/auth"  className={classes.items}>
                    <Typography>
                        Sign In
                    </Typography>
                </Link>)
                }
                
                </Toolbar>
        </AppBar></Slide>)}
        </>
    )
}

export default Navbar;