import React, {useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Form, FormControl, Card} from 'react-bootstrap';
import {UserContext} from '../../App.js';
import './post.style.css'

export const Post = (props) => {
    const {state} = useContext(UserContext);
 
    return (
        <>
            <Card className='post'>
                <Card.Title>{props.postedBy.name}{props.postedBy._id === state._id && <span className="close" onClick={() => props.deletePost(props._id)}>&times;</span>}</Card.Title>
                <Card.Img variant="top" src={props.photo} />
                <Card.Body>
                    {
                         props.likes.includes(state._id) ? 
                         <FontAwesomeIcon className='icon2' icon='heart' onClick={() => props.unlike(props._id)} /> 
                         :   
                         <FontAwesomeIcon className='icon' icon='heart' onClick={() => props.like(props._id)}  />
                    }
                    
                    <h6>{props.likes.length} likes</h6>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                    {props.body}
                    </Card.Text>

                    {
                        props.comments.map(record=>{
                            return(
                                    <h6 key={record._id} > <span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text} { record.postedBy._id === state._id && <span className="close" onClick={() => {props.deleteComment(props._id,record._id)}}>&times;</span>} </h6> 
                                  )
                                    })
                    }
                    <Form className="form"  onSubmit = {(e) => {
                        e.preventDefault(); 
                        props.makeComment(e.target[0].value,props._id)
                        
                        }
                    } >
                        <FormControl
                            placeholder="add comments..." 
                        />
                    </Form>
                </Card.Body>
            </Card>
            
        </>
    )
}
