import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Auth from "./components/Auth/Auth";
import Shop from "./components/Shop/Shop";
import Form from "./components/Form/Form";
import PostDetails from "./components/PostDetails/PostDetails";

const App =()=>{
    const user = JSON.parse(localStorage.getItem("profile"));
    return(
       <BrowserRouter>
            <Switch>
                <Route path="/auth" exact component={()=>(!user ? <Auth /> : <Redirect to="/posts" />)}/>
                <Route path="/" exact component={() => <Redirect to="/posts" />} />
                <Route path="/post/:id" exact component={PostDetails} />
                <Route path="/posts" exact component={Home} />
                <Route path="/about" exact component={About}/>
                <Route path="/newPost" exact component={Form} />
                {/* <Route path="/shop" exact component={Shop} /> */}
            </Switch>
       </BrowserRouter>     
    )
}

export default App;