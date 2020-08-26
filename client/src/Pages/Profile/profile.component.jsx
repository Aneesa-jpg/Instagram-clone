import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../../App.js';
import './profile.style.css'

export const Profile = () => {
    const [profile, setProfile] = useState([]);
    const {state} = useContext(UserContext);
    useEffect(() => {
        ( () => {
             fetch("/myPost", {
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer "+ localStorage.getItem("token")
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.posts);
                setProfile(data.posts);
            })
        })()
    }, [])

    return (
        <div className='outer-div'>
            <div className='profile-div'>
                <div className='img-div'>
                    <img className='dp'src='data:image/jpeg;base64,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' alt='dp' />
                </div>
                <div className='user-div'>
                    <h4>{state? state.name : "loading..."}</h4>
                    <div className='info-div'>
                        <p>40 Posts</p>
                        <p>40 Followers</p>
                        <p>40 Following</p>
                    </div>
                </div>
            </div>
            <div className='gallery'>
            {profile.map(pro => (
                <div class="img-wrap">
                <span class="close">&times;</span>
                <img key={pro._id} className='myPost' src={pro.photo} alt='dp' />
                </div>
            ))}
                
        
            </div>
        </div>
    )
}
