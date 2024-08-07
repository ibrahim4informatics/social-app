import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Box, Container, Input, InputGroup, InputLeftElement, Select, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'
import UserSearch from '../components/UserSearch'
import Post from '../components/Post'

const Search = () => {
  const [searchKeywords, setSearchKeywords] = useState('');
  const [searchType, setSearchType] = useState('users');
  const hundleChange = (e) => setSearchKeywords(e.target.value)
  return (
    <Layout>

      <Container my={2} >
        <Box px={2} mt={2} display={'flex'} alignItems={'center'} gap={1}>
          <InputGroup width={"100%"}>
            <Input value={searchKeywords} onChange={hundleChange} type='search' placeholder={"search."} variant={'filled'} />
            <InputLeftElement color={'GrayText'}><AiOutlineSearch /></InputLeftElement>
          </InputGroup>
        </Box>
        <Tabs colorScheme='purple'>
          <TabList>
            <Tab>Users</Tab>
            <Tab>Posts</Tab>
          </TabList>
          <TabPanels>
            <TabPanel h={{ base: "calc(100vh - 240px)", md: "calc(100vh - 120px)" }} overflowY={'auto'}>
              <UserSearch id={1} username={'pink'} key={1} />
              <UserSearch id={1} username={'pink'} key={1} />
              <UserSearch id={1} username={'pink'} key={1} />
              <UserSearch id={1} username={'pink'} key={1} />
              <UserSearch id={1} username={'pink'} key={1} />
              <UserSearch id={1} username={'pink'} key={1} />
              <UserSearch id={1} username={'pink'} key={1} />
              <UserSearch id={1} username={'pink'} key={1} />
              <UserSearch id={1} username={'pink'} key={1} />
              <UserSearch id={1} username={'pink'} key={1} />
              <UserSearch id={1} username={'pink'} key={1} />
              <UserSearch id={1} username={'pink'} key={1} />
              <UserSearch id={1} username={'pink'} key={1} />
            </TabPanel>
            <TabPanel h={{ base: "calc(100vh - 240px)", md: "calc(100vh - 120px)" }} overflowY={'auto'}>
              <Post caption={'this is the result'} id={45} user={{ username: "poo", id: 156 }} />
              <Post caption={'this is the result'} id={45} user={{ username: "poo", id: 156 }} />
              <Post caption={'this is the result'} id={45} user={{ username: "poo", id: 156 }} />
              <Post caption={'this is the result'} id={45} user={{ username: "poo", id: 156 }} />
              <Post caption={'this is the result'} id={45} user={{ username: "poo", id: 156 }} />
              <Post caption={'this is the result'} id={45} user={{ username: "poo", id: 156 }} />
              <Post caption={'this is the result'} id={45} user={{ username: "poo", id: 156 }} />
              <Post caption={'this is the result'} id={45} user={{ username: "poo", id: 156 }} />
              <Post caption={'this is the result'} id={45} user={{ username: "poo", id: 156 }} />
              <Post caption={'this is the result'} id={45} user={{ username: "poo", id: 156 }} />
              <Post caption={'this is the result'} id={45} user={{ username: "poo", id: 156 }} />
              <Post caption={'this is the result'} id={45} user={{ username: "poo", id: 156 }} />
              <Post caption={'this is the result'} id={45} user={{ username: "poo", id: 156 }} />
              <Post caption={'this is the result'} id={45} user={{ username: "poo", id: 156 }} />
            </TabPanel>

          </TabPanels>
        </Tabs>
      </Container>
    </Layout>
  )
}

export default Search