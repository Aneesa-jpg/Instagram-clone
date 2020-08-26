import React, { useState, useEffect } from 'react'
import { Post } from '../../Components/Post/post.component'
import './home.style.css';

export const Home = () => {
    const [userPosts, setUserPosts] = useState([]);
    useEffect(() => {
        (
             () => {
                fetch('/posts', {
                    headers : {
                        "Content-Type" : "application/json",
                        "Authorization" : "Bearer "+ localStorage.getItem("token")
                    }
                })
                .then(res => res.json())
                .then(data =>{
                    console.log(data.posts);
                    setUserPosts(data.posts);
                })
            }
        )()

    }, [])

    const like =  (id) => {
         fetch('/like', {
            method: 'put',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+ localStorage.getItem("token")
            },
            body: JSON.stringify({
                postId : id
            })
        })
        .then(res => res.json())
        .then(data =>{
            const newPost = userPosts.map( post => {
                if(post._id === data._id){
                    return data;
                }
                else{
                    return post;
                }
            });
            setUserPosts(newPost);
        }).catch(error => {
            console.log(error);
        })
    }
    const unLike =  (id) => {
         fetch('/unlike', {
            method: 'put',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+ localStorage.getItem("token")
            },
            body: JSON.stringify({
                postId : id
            })
        })
        .then(res => res.json())
        .then(data =>{
            const newPost = userPosts.map( post => {
                if(post._id === data._id){
                    return data;
                }
                else{
                    return post;
                }
            });
            setUserPosts(newPost);
        }).catch(error => {
            console.log(error);
        })
    }

    const makeComment = (text,postId)=>{
         fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = userPosts.map(item=>{
              if(item._id===result._id){
                  return result
              }else{
                  return item
              }
           })
          setUserPosts(newData)
        }).catch(err=>{
            console.log(err)
        })
  }

  const deletePost = (postId) => {
      console.log("delete post " + postId);
        fetch(`/deletePost/${postId}`, {
        method: 'delete',
        headers : {
            "Authorization" : "Bearer "+ localStorage.getItem("token")
        },
    })
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        const newUserPosts = userPosts.filter(post => {
            return post._id !== data._id
        })
        setUserPosts(newUserPosts);
    })
}
    return (
        <div className='home'>
        {
            userPosts.map(post => 
                <Post key={post._id} {...post} like={like} unlike={unLike} makeComment={makeComment} deletePost={deletePost} />
            )
        }
            
        </div>
    )
}
