import { Badge, Container } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import Post from '../components/Post';
import InfinitScrollComponenet from 'react-infinite-scroll-component'
import Loader from '../components/Loader';
import { fetcher } from '../axios.conf';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const [page, setPage] = useState(2);
  const [posts, setPosts] = useState(null);
  const [hasmore, setHasmore] = useState(true);
  const [payload, setPayload] = useState({});
  const user = useAuth()

  useEffect(() => {
    fetcher.get(`/api/posts?page=1`).then(res => {
      if (res.status === 200) {
        setPosts(res.data.posts);
        setPayload(res.data.page);
      }
    })
      .catch(err => {
        console.log(err);
        if(err.response.data.msg === "can not found informations"){
          setPosts([]);
          setHasmore(false);
        }
        return;
      })
  }, [])

  const hundleNext = async () => {
    if (page < payload.total) {
      setPage(prev => prev + 1);
    }
    else {
      setHasmore(false)
    }
    try {

      const res = await fetcher.get(`/api/posts?page=${page}`);
      if (res.status === 200) {
        setPosts(prev => prev.concat(res.data.posts));
        setPayload(res.data.page);
      }

    }
    catch (err) {
      console.log(err);
      return;
    }
  }


  return (
    <Layout>
      <Container mt={2}>

        {posts === null ? <Loader /> : (
          <InfinitScrollComponenet
            dataLength={posts.length} hasMore={hasmore} loader={<Loader />} next={hundleNext} endMessage={posts.length > 0 ? <Badge w={'100%'} py={2} rounded={'md'} textAlign={'center'} colorScheme='purple'>End Of The Feed</Badge> :''}
          >



            {posts.length > 0 ? posts.map(post => <Post key={post.id} id={post.id} user={post.user} caption={post.caption} picture={post.picture} />) : 'nothing😒'}
          </InfinitScrollComponenet>
        )}





      </Container>
    </Layout>
  )
}

export default Home