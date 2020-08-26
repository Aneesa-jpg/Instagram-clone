import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import './createPost.style.css';

export const CreatePost = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
       (  ()  => {if(url){
             fetch('/createPost', {
                method : 'post',
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer "+ localStorage.getItem("token")
                },
                body : JSON.stringify({
                    title,
                    body,
                    photo : url
                })
            })
            .then(res => res.json())
            .then (data => {
                if(data.error){
                   console.log(data.error);
                }
                else{
                    history.push('/')
                }
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })}
           
        }  )() 
    }, [url])

    const createPost = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset","insta-clone");
        data.append("cloud_name","dwsi0tt0l");
        fetch("https://api.cloudinary.com/v1_1/dwsi0tt0l/image/upload",{
            method: "post",
            body:data
        })
        .then(res => res.json())
        .then(data => {
            setUrl(data.url);
        })
        .catch(error => {
            console.log(error);
        }) 

    }
    return (
        <div>
            <Form className="form"  onSubmit = {(e) => createPost(e)} >
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>title</Form.Label>
                    <Form.Control name="title" type="text" placeholder="title" value={title} onChange={ e => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicBody">
                    <Form.Label>body</Form.Label>
                    <Form.Control name="body" type="text" placeholder="body" value={body} onChange={ e => setBody(e.target.value)} />
                </Form.Group>
                
                <Form.File id="formcheck-api-regular">
                <Form.File.Label>Upload image</Form.File.Label>
                <Form.File.Input name="photo" onChange={ e => setImage(e.target.files[0])} />
                </Form.File>
  
                <Button variant="dark" type="submit" >
                    Create Post!
                </Button>
            </Form>
        </div>
    )
}
