import React, { useEffect, useState } from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Auth from "./components/Auth/Auth";
import Shop from "./components/Shop/Shop";
import Form from "./components/Form/Form";
import PostDetails from "./components/PostDetails/PostDetails";

const App =()=>{
    const creators = ["kediaarts@gmail.com","rhythmbhatia28@gmail.com","jayverma878@gmail.com","vsviveksonu@gmail.com"];
    const user = JSON.parse(localStorage.getItem("profile"));
    const [role,setRole] = useState(false);

    useEffect(()=>{
        creators.map((creator)=> {if(creator===user?.result?.email)setRole(true)});
    },[role]);

    return(
       <BrowserRouter>
            <Switch>
                <Route path="/auth" exact component={()=>(!user ? <Auth /> : <Redirect to="/posts" />)}/>
                <Route path="/" exact component={() => <Redirect to="/posts" />} />
                <Route path="/post/:id" exact component={PostDetails} />
                <Route path="/posts" exact component={Home} />
                <Route path="/about" exact component={About}/>
                {role ? (<Route path="/newPost" exact component={Form} />) :(<Redirect to="/posts" />) }
                {/* <Route path="/shop" exact component={Shop} /> */}
            </Switch>
       </BrowserRouter>     
    )
}

export default App;