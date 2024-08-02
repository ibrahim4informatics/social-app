import {  Container } from '@chakra-ui/react'
import React, { useState, useRef } from 'react';
import Layout from '../components/Layout'
import Post from '../components/Post';

const Home = () => {
  const [posts, setposts] = useState([
    {caption:"my new laptop!", user:{username:"John Wick", id:1}, picture:"https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", id:1},
    {caption:"hello i am new here", user:{username:"Newbi", id:2},id:2},
    {caption:"مرحبا كيف حالكم", user:{username:"Maissoun Boumer", id:2},id:3},
    {caption:"hello i am new here", user:{username:"Newbi", id:2},id:4},
    {caption:"hello i am new here", user:{username:"Newbi", id:2},id:5},
  ]);


  return (
    <Layout>
      <Container mt={2}>
       {posts.length > 0 ? posts.map(post=> <Post id={post.id} key={post.id} caption={post.caption} picture={post.picture} user={post.user} />) : ''}

      </Container>
    </Layout>
  )
}

export default Home