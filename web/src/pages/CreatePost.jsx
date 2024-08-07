import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Container, Box, FormControl, FormLabel, Heading, Textarea, FormHelperText, Button, Text, FormErrorMessage } from '@chakra-ui/react'
import { fetcher } from '../axios.conf';
import { useNavigate } from 'react-router-dom';
const CreatePost = () => {
  const [postData, setPostData] = useState({ file: '', caption: '' });
  const [error, setError] = useState({ caption: "", file: "" });
  const navigate = useNavigate();
  const hundleInputChange = (e) => {
    if (e.target.value.length <= 500) {
      setPostData({ ...postData, caption: e.target.value })
    }
    else {
      return
    }
  }
  const hundleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log('no file selected');
      return;
    }
    else {
      setPostData({ ...postData, file: e.target.files[0] });
    }
  }
  const hundleSubmit = async (e) => {
    if (!postData.caption && !postData.file) {
      return setError({ file: "you need at least a file or caption", caption: "you need at least a file or caption" })
    }
    const fd = new FormData();
    if (postData.caption) {
      fd.append('caption', postData.caption);
    }

    if (postData.file) {
      fd.append('picture', postData.file)
    }

    try {

      const res = await fetcher.post('/api/posts', fd);
      if (res.status === 201) {

        return navigate(`/${res.data.post.id}`)

      }

    }
    catch (err) {
      console.log(err)

    }
  }
  return (
    <Layout>
      <Container justifyContent={'center'} h={{ base: "calc(100vh - 150px)", md: "100vh" }} display={'flex'} flexDir={'column'}>
        <Heading size={'md'} color={'purple.400'}>What You're Thinking About?</Heading>
        <Box mt={4}>
          <FormControl isInvalid={error.caption}>
            <FormLabel>Caption:</FormLabel>
            <Textarea variant={'filled'} onChange={hundleInputChange} value={postData.caption} name='caption' resize={'none'} maxLength={500} />
            <FormHelperText>{postData.caption.length}/500</FormHelperText>
            <FormErrorMessage>{error.caption}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={error.file}>
            <FormLabel>Picture:</FormLabel>
            <Box transition={'300ms'} animation={'all'} alignItems={'center'} justifyContent={'center'} display={'flex'} cursor={'pointer'} w={"100%"} h={40} border={'2px dashed'} borderColor={error.file ? "#E53E3E" : "#9F7AEA"} borderRadius={8} >
              <input onChange={hundleFileInputChange} type="file" style={{ opacity: 0, width: "100%", height: "100%", cursor: 'pointer', position: 'absolute' }} />
              <Text color={'GrayText'} >Drop Image Or Click To Choos</Text>
            </Box>
            <FormErrorMessage>{error.file}</FormErrorMessage>
          </FormControl>
          {postData.file && <Box my={2} color={'purple.400'} fontSize={12} ml={2}> <Text>Selcted: {postData.file.name} </Text> </Box>}
          <Button onClick={hundleSubmit} mt={3} w={180} colorScheme='purple'>Post</Button>
        </Box>
      </Container>


    </Layout>
  )
}

export default CreatePost