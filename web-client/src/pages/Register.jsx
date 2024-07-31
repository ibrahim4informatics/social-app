import React from 'react';
import { useState } from 'react';
import { Box, Heading, FormControl, FormErrorMessage, FormLabel, FormHelperText, Input, Button, Link, Text, Image } from '@chakra-ui/react'
import registerSvg from '../assets/images/register.svg'
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
          <Heading mb={2}>Welcome!</Heading>
          <FormControl isRequired my={4}>
            <FormLabel>FirstName</FormLabel>
            <Input onChange={hundleInputChange} size={{ base: "md", md: "lg" }} name='first_name' type='text' value={data.first_name} variant={"filled"} />
          </FormControl>
          <FormControl isRequired my={4}>
            <FormLabel>LastName</FormLabel>
            <Input onChange={hundleInputChange} size={{ base: "md", md: "lg" }} name='last_name' type='text' value={data.last_name} variant={"filled"} />
          </FormControl>
          <FormControl isRequired my={4}>
            <FormLabel>Username</FormLabel>
            <Input onChange={hundleInputChange} size={{ base: "md", md: "lg" }} name='username' type='text' value={data.username} variant={"filled"} />
          </FormControl>
          <FormControl isRequired my={4}>
            <FormLabel>Email</FormLabel>
            <Input onChange={hundleInputChange} size={{ base: "md", md: "lg" }} name='email' type='email' value={data.email} variant={"filled"} />
          </FormControl>
          <FormControl isRequired my={4}>
            <FormLabel>Password</FormLabel>
            <Input onChange={hundleInputChange} size={{ base: "md", md: "lg" }} name='password' type='password' value={data.password} variant={"filled"} />
          </FormControl>
          <FormControl isRequired my={4}>
            <FormLabel>Confirm</FormLabel>
            <Input onChange={hundleInputChange} size={{ base: "md", md: "lg" }} name='confirm' type='password' value={data.confirm} variant={"filled"} />
          </FormControl>
          <Box width={"100%"} display={'flex'} alignItems={'center'} my={2}>
            <Text ml={1} fontSize={'14px'} color={'GrayText'} mr={5}>Already have an account?</Text>
            <Link href='/register' fontWeight={"bold"}>Login</Link>
          </Box>
          <Button onClick={hundleClick} background={'black'} color={'white'} width={"120px"}>Register</Button>
        </Box>

      </Box>
      <Box
        bg={'black'} width={"50%"} height={{ base: "100svh", lg: "100vh" }} display={{ base: "none", lg: "flex" }}
        alignItems={"center"} justifyContent={"center"}
      >
        <Image src={registerSvg} maxW={650} width={"80%"} alt='error'  />
      </Box>
    </Box>
  )
}

export default Login