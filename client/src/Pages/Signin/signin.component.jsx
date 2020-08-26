import React, { useState, useContext } from 'react';

import { Form, Button, Toast } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

import {UserContext} from '../../App.js'
import './signin.style.css'

export const Signin = () => {
    const { dispatch} = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

    const postData =  (event) => {
        event.preventDefault();
        fetch('/signin', {
            method : 'post',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email,
                password
            })
        })
        .then(res => res.json())
        .then (data => {
            console.log(data);
            if(data.error){
                setError(data.error);
                setShow(true);
            }
            else{
                localStorage.setItem("token",data.token);
                localStorage.setItem("user",JSON.stringify(data.user));
                dispatch({type:"USER", payload: data.user})
                history.push('/')
            }
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
    }


    return (
        <div className='form'>
            <Form onSubmit = { (event) => postData(event) }>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={ (e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={ (e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
            <Link className='link' to='/signup'>Create account</Link>
            {error ? 
                <Toast className='error-message' show={show} delay={3000} autohide>
                    <Toast.Body>{error}</Toast.Body>
                </Toast> : null}
        </div>
    )
}
