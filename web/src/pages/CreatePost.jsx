import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Container, Box, FormControl, FormLabel, Heading, Textarea, FormHelperText, Input, Button } from '@chakra-ui/react'

const CreatePost = () => {
  const [postData, setPostData] = useState({ file: '', caption: '' });
  const hundleInputChange = (e) => {
    setPostData({ ...postData, caption: e.target.value })
  }
  const hundleFileInputChange = (e) => {
    if (!e.target.files[0]) {
      console.log('no file selected');
      return;
    }
    else {
      setPostData({ ...postData, file: e.target.files[0] });
    }
  }
  const hundleSubmit = () => {
    const fd = new FormData();
    if (postData.caption) {
      fd.append('caption', postData.caption);
    }

    if (postData.file) {
      fd.append('picture', postData.file)
    }

    // make axios request and pass form data
    return
  }
  return (
    <Layout>
      <Container justifyContent={'center'} h={{ base: "calc(100vh - 150px)", md: "100vh" }} display={'flex'} flexDir={'column'}>
        <Heading size={'md'} color={'purple.400'}>What You're Thinking About?</Heading>
        <Box mt={4}>
          <FormControl>
            <FormLabel>Caption:</FormLabel>
            <Textarea onChange={hundleInputChange} value={postData.caption} name='caption' resize={'none'} maxLength={500} />
            <FormHelperText>{postData.caption.length}/500</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Caption:</FormLabel>
            <Input accept='image/png, image/jpg, image/jpeg, image/webp' onChange={hundleFileInputChange} name='picture' type='file' />
          </FormControl>
          <Button onClick={hundleSubmit} mt={3} w={180} colorScheme='purple'>Post</Button>
        </Box>
      </Container>

    </Layout>
  )
}

export default CreatePost