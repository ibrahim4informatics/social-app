import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Avatar, Badge, Box, Container, FormControl, FormErrorMessage, Heading, IconButton, Image, Input, InputGroup, InputRightElement, Spinner, Text } from '@chakra-ui/react'
import { AiOutlineSend } from 'react-icons/ai'
import Comment from '../components/Comment'
import { useFetch } from '../hooks/useFetch'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { timeFormatter } from '../functions/formatDiffrenceinMs'
import { fetcher } from '../axios.conf'
const Post = () => {
  const { id } = useParams();
  const [commentInfo, setCommentInfo] = useState({ err: "", content: "", status: null })
  const { data, error, isLoading } = useFetch(`/api/posts/${id}`)

  const hundleCommentChange = (e) => {
    setCommentInfo({ ...commentInfo, err: '', content: e.target.value });
  }
  const hundleCommentSubmit = async () => {
    if (!commentInfo.content || commentInfo.content.trim().length < 3) {
      return setCommentInfo({ ...commentInfo, err: "comment must contain at least 3 characters" });
    }
    setCommentInfo({ ...commentInfo, status: false });


    try {

      const res = await fetcher.post('/api/comments', { content: commentInfo.content, post_id: id });
      if (res.status === 201) {
        //TODO : Add some notifications;
        setCommentInfo({ ...commentInfo, status: true, content: "" });


      }
    }
    catch (err) {
      console.log(err);
    }



  }
  return (
    <Layout>
      {!isLoading && data !== null ? <Container py={3}>

        <Box width={'100%'} display={'flex'} alignItems={'center'} gap={1}>
          <Avatar name={data.post.user.username} />
          <Link to={localStorage.getItem('user_id') === data.post.user.id ? '/profile' : `/users/${data.post.user.id}`}><Text color={'black'} fontSize={14} fontWeight={'bold'} ml={2}>@{data.post.user.username}</Text></Link>
          <Badge colorScheme='purple' p={1} fontSize={12} fontWeight={300} color={'GrayText'} ms={'auto'}>published:{timeFormatter(Date.now() - new Date(data.post.createdAt))}</Badge>
        </Box>
        <Box my={2}>
          <Text my={3} >
            {data.post.caption}
          </Text>
          <Image my={3} w={"100%"} objectFit={'contain'} src={data.post.picture} />
        </Box>

        <Heading size={'md'} mt={4}>Comments</Heading>
        <Box display={'flex'} flexDirection={'column-reverse'} width={'100%'} h={{ base: 500, md: 650 }} my={3} overflowY={'auto'} px={1}>
          <FormControl my={2} isInvalid={commentInfo.err} >
            <InputGroup>
              <Input placeholder='comment😁.' value={commentInfo.content} onChange={hundleCommentChange} type='text' variant={'filled'} />
              <InputRightElement>
                <IconButton onClick={hundleCommentSubmit} icon={commentInfo.status !== null ? (commentInfo.status ? <AiOutlineSend /> : <Spinner size={'sm'} colorScheme='purple' />) : <AiOutlineSend />} />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{commentInfo.err}</FormErrorMessage>
          </FormControl>
          <Box flex={1} px={1} w={'100%'} h={'100%'} overflowY={'auto'}>
            <Box p={3} w={"100%"} h={"100%"} bg={'white'} overflowY={'auto'}>
              {data.post.comments.map(comment => <Comment content={comment.content} user={comment.user} id={comment.id} key={comment.id} />)}

            </Box>

          </Box>




        </Box>

      </Container> : <Loader />
      }
    </Layout >
  )
}

export default Post