import React from 'react';
import {Box, Button, Heading, Text} from "@chakra-ui/react";
import {AiOutlineArrowLeft} from 'react-icons/ai';
import {useNavigate, useRouteError} from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate();
  const errors = useRouteError()
  return (
    <Box w={"100%"} h={"100vh"} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
      <Heading mb={4} size={'3xl'} color={'purple.600'} >Oops</Heading>
      <Text my={4} color={'GrayText'} fontSize={18} fontWeight={'bold'}  >{errors.statusText || errors.message}</Text>
      <Button onClick={()=> navigate(-1)} colorScheme='purple'><AiOutlineArrowLeft/><Text ml={2}>Back</Text></Button>

    </Box>
  )
}

export default Error