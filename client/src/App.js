import React from "react";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Auth from "./components/Auth/Auth";
import Shop from "./components/Shop/Shop";
import Form from "./components/Form/Form";

const App =()=>{
    return(
       <BrowserRouter>
            <Switch>
                <Route path="/auth" exact component={Auth}/>
                <>
                <Route path="/" exact component={() => <Redirect to="/posts" />} />
                <Route path="/posts" exact component={Home} />
                <Route path="/about" exact component={About}/>
                {/* <Route path="/shop" exact component={Shop} /> */}
                <Route path="/newPost" exact component={Form} />
                </>
            </Switch>
       </BrowserRouter>     
    )
}

export default App;