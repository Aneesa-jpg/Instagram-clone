import React, { useEffect,useContext }  from 'react'
import { Home } from '../Pages/Home/home.component';
import { Profile } from '../Pages/Profile/profile.component';
import { Signin } from '../Pages/Signin/signin.component';
import { Signup } from '../Pages/Signup/signup.component';
import { CreatePost } from '../Pages/CreatePost/createPost.component';
import { Switch, Route, useHistory } from "react-router-dom";
import {UserContext} from '../App.js';

export const Routing = () => {
    const history = useHistory();
    const { dispatch } = useContext(UserContext);
    
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER",payload:user});
    }
    else{
      history.push('/signin');
    }
  }, [])
    return (
        <>
         <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/signin">
                    <Signin/>
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/createPost">
                    <CreatePost />
                </Route>
            </Switch>   
        </>
    )
}
