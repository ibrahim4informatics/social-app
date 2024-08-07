import React, { useContext, useState } from 'react'
import Layout from '../components/Layout'
import { Avatar, Badge, Box, Container, FormControl, Heading, IconButton, Image, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { AiOutlineSend } from 'react-icons/ai'
import Comment from '../components/Comment'
import { UserContext } from '../contexts/UserContext'
import { useFetch } from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { timeFormatter } from '../functions/formatDiffrenceinMs'
const Post = () => {
  const [comment, setComment] = useState("");
  const [current_user] = useContext(UserContext)
  const hundleCommentChange = (e) => setComment(e.target.value);
  const hundleCommentSubmit = () => { console.log({ content: comment, user_id: current_user.id }) }
  const { id } = useParams();
  const { data, error, isLoading } = useFetch(`/api/posts/${id}`)
  return (
    <Layout>
      {!isLoading && data !== null ? <Container py={3}>

        <Box width={'100%'} display={'flex'} alignItems={'center'} gap={1}>
          <Avatar name={data.post.user.username} />
          <Text color={'black'} fontSize={14} fontWeight={'bold'} ml={2}>@{data.post.user.username}</Text>
          <Badge colorScheme='purple' p={1} fontSize={12} fontWeight={300} color={'GrayText'} ms={'auto'}>published:{timeFormatter(Date.now() - new Date(data.post.createdAt))}</Badge>
        </Box>
        <Box my={2}>
          <Text my={3} >
            {data.post.caption}
          </Text>
          <Image my={3} w={"100%"} objectFit={'contain'} src={data.post.picture} />
        </Box>

        <Heading size={'md'} mt={4}>Comments</Heading>

        <Box px={1} w={'100%'} maxH={720}>
          <Box p={3} w={"100%"} h={"calc(100% - 120px)"} bg={'white'} overflowY={'auto'}>
            {data.post.comments.map(comment => <Comment content={comment.content} user={comment.user} id={comment.id} key={comment.id} />)}

          </Box>
          <FormControl >
            <InputGroup>
              <Input placeholder='comment😁.' value={comment} onChange={hundleCommentChange} type='text' variant={'filled'} />
              <InputRightElement>
                <IconButton onClick={hundleCommentSubmit} icon={<AiOutlineSend />} />
              </InputRightElement>
            </InputGroup>
          </FormControl>



        </Box>

      </Container> : <Loader />}
    </Layout>
  )
}

export default Post