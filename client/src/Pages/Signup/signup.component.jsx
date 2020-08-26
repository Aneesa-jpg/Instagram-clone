import React, { useState } from 'react'
import './signup.style.css'

import { Form, Button, Toast } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

export const Signup = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

    const postData = (event) => {
        event.preventDefault();
         fetch('/signup', {
            method : 'post',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name,
                email,
                password
            })
        })
        .then(res => res.json())
        .then (data => {
            if(data.error){
                setError(data.error);
                setShow(true);
            }
            else{
                history.push('/signin')
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
                <Form.Group controlId="formBasicName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={name} onChange={ (e) => setName(e.target.value) } />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={ (e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={ (e) => setPassword(e.target.value)} />
                </Form.Group>
               
                <Button variant="dark" type="submit" >
                    SignUp
                </Button>
            </Form>
            <Link className='link' to='/signin'>Already have account</Link>
            {error ? 
                <Toast className='error-message' show={show} delay={3000} autohide>
                    <Toast.Body>{error}</Toast.Body>
                </Toast> : null}
       
        </div>
    )
}
