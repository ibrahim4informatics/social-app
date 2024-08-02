import React, {useState} from 'react'
import Layout from '../components/Layout'
import { Box, Container, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'
import UserSearch from '../components/UserSearch'

const Search = () => {
  const [searchKeywords, setSearchKeywords] = useState('');
  const [searchType,setSearchType] = useState('users');
  const hundleChange = (e)=> setSearchKeywords(e.target.value)
  return (
    <Layout>
      <Box px={2} mt={2} display={'flex'} alignItems={'center'} gap={1}>
        <InputGroup width={"100%"}>
          <Input value={searchKeywords} onChange={hundleChange} type='search' placeholder={"search."} variant={'filled'} />
          <InputLeftElement color={'GrayText'}><AiOutlineSearch/></InputLeftElement>
        </InputGroup>
        <Select onChange={(e)=> setSearchType(e.target.value)} value={searchType} w={120}>
          <option value="users">Users</option>
          <option value="posts">Posts</option>
        </Select>
      </Box>
      <Container my={2} >
        <UserSearch id={1} username={'ibdev'} />
      </Container>
    </Layout>
  )
}

export default Search