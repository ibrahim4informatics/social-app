import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Avatar, Box, Button, Container, Heading, Text, Tabs, TabList, TabPanel, TabPanels, Tab, FormControl, FormLabel, Input } from '@chakra-ui/react'
import formatFollowers from '../functions/formatFollowers'
import Post from '../components/Post'
import { useFetch } from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { fetcher } from '../axios.conf'
const User = () => {
  const { id } = useParams();
  const { data, isLoading, setData } = useFetch(`/api/users/${id}`);

  const hundleFollow = async () => {
    try {
      const res = await fetcher.patch(`/api/users/follow/${id}`);
      if (res.status === 200) {

        setData({ ...data, followed: true });

      }
    }
    catch (err) {
      console.log(err);
      return
    }
  }
  const hundleUnFollow = async () => {
    try {
      const res = await fetcher.patch(`/api/users/unfollow/${id}`);
      if (res.status === 200) {
        setData({ ...data, followed: false });

      }
    }
    catch (err) {
      console.log(err);
      return
    }
  }

  return (
    <Layout>

      {isLoading ? <Loader /> : (<Container h={"100vh"} display={'flex'} flexDir={'column'} my={2} overflowY={'auto'} py={0}>
        <Box my={4} display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}>


          <Box>
            <Avatar mb={1} name={`${data.user.first_name} ${data.user.last_name}`} />
            <Text fontSize={14} fontWeight={'bold'} mt={1}>@{data.user.username}</Text>
          </Box>

          <Box bg={'purple.100'} p={4} rounded={'xl'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
            <Heading size={'md'} mb={1}>{formatFollowers(data.user.followers.length)}</Heading>
            <Text fontSize={16} fontWeight={'bold'}>Followers</Text>
          </Box>

          <Box bg={'purple.100'} p={4} rounded={'xl'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
            <Heading size={'md'} mb={1}>{formatFollowers(data.user.following.length)}</Heading>
            <Text fontSize={16} fontWeight={'bold'}>Following</Text>
          </Box>

        </Box>

        <Box w={"100%"} display={'flex'} mt={4} alignItems={'center'} justifyContent={'center'}>
          {data.followed ? <Button onClick={hundleUnFollow} w={'80%'} colorScheme='gray'>Unfollow</Button> : <Button w={'80%'} onClick={hundleFollow} colorScheme='purple'>Follow</Button>}
        </Box>


        <Box my={data.followed ? 2 : 'auto'}>
          {data.followed ? (
            <Box my={3} p={2}>
              <Tabs>
                <TabList>
                  <Tab>Posts</Tab>
                  <Tab>Profile</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {data.user.posts && data.user.posts.length > 0 ? (
                      data.user.posts.map(post => <Post key={post.id} user={data.user} caption={post.caption} picture={post.picture} id={post.id} />)
                    ) : <Text color={"GrayText"} mt={2} textAlign={'center'}>Nothing 😒</Text>}
                  </TabPanel>
                  <TabPanel>
                    <FormControl my={2}>
                      <FormLabel>First Name:</FormLabel>
                      <Input variant={'filled'} readOnly value={data.user.first_name} />
                    </FormControl>

                    <FormControl my={2}>
                      <FormLabel>Last Name:</FormLabel>
                      <Input variant={'filled'} readOnly value={data.user.last_name} />
                    </FormControl>

                    <FormControl my={2}>
                      <FormLabel>Username:</FormLabel>
                      <Input variant={'filled'} readOnly value={data.user.username} />
                    </FormControl>

                  </TabPanel>
                </TabPanels>
              </Tabs>


            </Box>
          ) : <Text textAlign={'center'} color={'GrayText'}>Follow To See Content</Text>}
        </Box>


      </Container>)}

    </Layout>
  )
}


export default User