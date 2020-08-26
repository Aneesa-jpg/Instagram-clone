import React,  { useContext } from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import './navbar.style.css'

import {UserContext} from '../../App';

export const NavbarComponent = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();

   const checkSignin = () => {
       if(state){
           return (<>
                    <Link className='link_' to="/createPost">Create Post</Link>
                    <Link className='link_' to="/profile">Profile</Link>
                    <Button variant="dark" onClick={() => {
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push("/signin")

                    }}>
                        Logout
                    </Button>
                    </>)
       }
       else{
           return ( <>
            <Link className='link_' to="/signup">Signup</Link>
            <Link className='link_' to="/signin">Signin</Link>
            </>
           )
       }
   }
    return (
        <div>
           <Navbar  bg="dark" variant="dark">
                <Navbar.Brand className="brandName" href={state ? "/" : "/signin"}>InstaShot!</Navbar.Brand>
                <Nav className="ml-auto">
                { 
                    checkSignin()
                }

                </Nav>
            </Navbar>
        </div>
    )
}
