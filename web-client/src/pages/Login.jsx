import React from 'react';
import { useState } from 'react';
import { Box, Heading, FormControl, FormErrorMessage, FormLabel, FormHelperText, Input, Button, Link, Text, Image } from '@chakra-ui/react'
import loginSvg from '../assets/images/login.svg'
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const hundleClick = ()=> {
    console.log(data);
  }
  const hundleInputChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <Box display={"flex"}>
      <Box
        width={{ base: "100%", lg: "50%" }} height={{ base: "100svh", lg: "100vh" }} bg={''} display={'flex'}
        alignItems={'center'} justifyContent={{base:"center", lg:"start"}}
      >
        <Box w={"90%"} maxW={600} bg={''} ml={5} py={4} px={2}>
          <Heading mb={2}>Welcome Back!</Heading>
          <FormControl isRequired my={4}>
            <FormLabel>Email</FormLabel>
            <Input onChange={hundleInputChange} size={{ base: "md", md: "lg" }} name='email' type='email' value={data.email} variant={"filled"} />
          </FormControl>
          <FormControl isRequired my={4}>
            <FormLabel>Password</FormLabel>
            <Input onChange={hundleInputChange} size={{ base: "md", md: "lg" }} name='password' type='password' value={data.password} variant={"filled"} />
          </FormControl>
          <Box width={"100%"} display={'flex'} alignItems={'center'} my={2}>
            <Text ml={1} fontSize={'14px'} color={'GrayText'} mr={5}>Don't have an account?</Text>
            <Link href='/register' fontWeight={"bold"}>Register</Link>
          </Box>
          <Button onClick={hundleClick} background={'black'} color={'white'} width={"120px"}>LOGIN</Button>
        </Box>

      </Box>
      <Box
        bg={'black'} width={"50%"} height={{ base: "100svh", lg: "100vh" }} display={{ base: "none", lg: "flex" }}
        alignItems={"center"} justifyContent={"center"}
      >
        <Image src={loginSvg} maxW={650} width={"80%"} alt='error'  />
      </Box>
    </Box>
  )
}

export default Login