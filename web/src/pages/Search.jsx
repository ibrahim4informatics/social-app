import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Badge, Box, Container, Input, InputGroup, InputLeftElement, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'
import UserSearch from '../components/UserSearch'
import { fetcher } from '../axios.conf';
import InfiniteScrollComponent from 'react-infinite-scroll-component'
import Loader from '../components/Loader'
const Search = () => {
  const [users, setUsers] = useState(null);
  const [username, setUsername] = useState('');
  const [hasMore, setHasmore] = useState(true);
  const [page, setPage] = useState(2);
  const hundleChange = async (e) => {
    setUsername(e.target.value);
  }
  const hundleSearch = async () => {
    if (username.trim().length < 3) return
    try {

      const res = await fetcher.get(`/api/users/search?username=${username}&page=1`);
      if (res.status === 200) {

        setUsers(res.data.users.length > 0 ? res.data.users : []);
        setHasmore(false);
        return
      }
    }

    catch (err) {

      console.log(err);
      return

    }
  }

  const hundleNext = async () => {
    console.log('first')
    try {

      const res = await fetcher.get(`/api/users/search?username=${username}&page=${page}`);
      if (res.status === 200 && res.data.users.length > 0) {
        setUsers(users.concat(res.data.users));
        setPage(prev => prev + 1)
      }

      else if (res.status === 200 && res.data.users.length < 1) {
        setHasmore(false);
      }

    }

    catch (err) {
      console.log(err)
    }
    return
  }
  return (
    <Layout>
      <Container my={2} >
        <Box pos={'sticky'} top={0} px={2} mt={2} display={'flex'} alignItems={'center'} gap={1}>
          <InputGroup width={"100%"}>
            <Input value={username} onChange={hundleChange} onKeyUp={hundleSearch} type='search' placeholder={"search for users by username."} variant={'filled'} />
            <InputLeftElement color={'GrayText'}><AiOutlineSearch /></InputLeftElement>
          </InputGroup>
        </Box>
        <Box h={'calc(100vh - 220px)'} id='scrollInfinit' overflowY={'auto'} px={2} my={3}>
          {users && <InfiniteScrollComponent loader={<Loader />} endMessage={<Badge colorScheme='purple' w={'100%'} textAlign={'center'} py={1}>End Of Search</Badge>} scrollableTarget="scrollInfinit" dataLength={users.length} hasMore={hasMore} next={hundleNext}>
            {users.length > 0 ? users.map(user => <UserSearch key={user.id} username={user.username} id={user.id} />) : <Text my={2} textAlign={'center'} color={'GrayText'}>No User Found!</Text>}
          </InfiniteScrollComponent>}
        </Box>
      </Container>
    </Layout>
  )
}

export default Search