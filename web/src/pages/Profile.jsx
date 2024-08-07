import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout'
import { Avatar, Box, Container, Heading, Spinner, Text, Tabs, TabList, TabPanels, Tab, TabPanel, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import Post from '../components/Post'
import { UserContext } from '../contexts/UserContext';
import Loader from '../components/Loader';
import { AiOutlineEdit } from 'react-icons/ai';
import formatFollowers from '../functions/formatFollowers';
import { useFetch } from '../hooks/useFetch';
import { fetcher } from '../axios.conf';




const Profile = () => {

  const [user, setUser] = useContext(UserContext);
  const { data, error, isLoading } = useFetch("/api/users");
  useEffect(() => {
    if (!isLoading && data) setUser((data?.user));
    
  }, [isLoading])

  return (
    <Layout>
      {user !== null ? (
        <Container>
          <Box my={3} display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}>

            <Box>
              <Avatar mb={1} name={`${user.first_name} ${user.last_name}`} />
              <Text fontSize={14} fontWeight={'bold'} mt={1}>@{user.username}</Text>
            </Box>

            <Box bg={'purple.100'} p={4} rounded={'xl'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
              <Heading size={'md'} mb={1}>{formatFollowers(user.followers.length)}</Heading>
              <Text fontSize={16} fontWeight={'bold'}>Followers</Text>
            </Box>

            <Box bg={'purple.100'} p={4} rounded={'xl'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
              <Heading size={'md'} mb={1}>{formatFollowers(user.following.length)}</Heading>
              <Text fontSize={16} fontWeight={'bold'}>Following</Text>
            </Box>

          </Box>
          <Box my={3} p={2}>
            <Tabs>
              <TabList>
                <Tab>Posts</Tab>
                <Tab>Profile</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {user.posts && user.posts.length > 0 ? (
                    user.posts.map(post => <Post key={post.id} user={user} caption={post.caption} picture={post.picture} id={post.id} />)
                  ) : <Text>Create Post</Text>}
                </TabPanel>
                <TabPanel>
                  <FormControl my={2}>
                    <FormLabel>First Name:</FormLabel>
                    <Input variant={'filled'} readOnly value={user.first_name} />
                  </FormControl>

                  <FormControl my={2}>
                    <FormLabel>Last Name:</FormLabel>
                    <Input variant={'filled'} readOnly value={user.last_name} />
                  </FormControl>

                  <FormControl my={2}>
                    <FormLabel>Username:</FormLabel>
                    <Input variant={'filled'} readOnly value={user.username} />
                  </FormControl>

                  <FormControl my={2}>
                    <FormLabel>Email:</FormLabel>
                    <Input type='email' variant={'filled'} readOnly value={user.email} />
                  </FormControl>
                  <Box mt={3} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    <Button colorScheme='red'>Change Password</Button>
                    <Button colorScheme='purple'><AiOutlineEdit />Edit Profile</Button>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>


          </Box>
        </Container>

      ) : <Loader />}
    </Layout>
  )
}

export default Profile


{/* */ }