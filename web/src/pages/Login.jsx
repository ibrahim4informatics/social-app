import React, { useContext } from 'react';
import { useState } from 'react';
import { Box, Heading, FormControl, FormErrorMessage, FormLabel, Input, Button, Link, Text, Image, Spinner } from '@chakra-ui/react'
import loginSvg from '../assets/images/login.svg'
import { fetcher } from '../axios.conf';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext';
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useContext(UserContext)
  const navigate = useNavigate();
  const hundleClick = async () => {
    setIsLoading(true);
    try {

      const res = await fetcher.post('/api/auth/login', data);
      if (res.status === 200) {
        setUser(res.data.user);
        localStorage.setItem('user_id', res.data.user.id)
        setIsLoading(false);
        return navigate("/");
      }

    }

    catch (err) {
      console.log(err)

      if (err.response.status !== 500) {
        setFormError(err.response.data.msg);
        setIsLoading(false)
      }


    }





  }
  const hundleInputChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <Box display={"flex"}>
      <Box
        width={{ base: "100%", lg: "50%" }} height={{ base: "100svh", lg: "100vh" }} bg={''} display={'flex'}
        alignItems={'center'} justifyContent={{ base: "center", lg: "start" }}
      >
        <Box w={"90%"} maxW={600} bg={''} ml={5} py={4} px={2}>
          <Heading mb={2}>Welcome Back!</Heading>
          <FormControl isInvalid={formError} isRequired my={4}>
            <FormLabel>Email</FormLabel>
            <Input onChange={hundleInputChange} size={{ base: "md", md: "lg" }} name='email' type='email' value={data.email} variant={"filled"} />
            {formError && <FormErrorMessage>{formError}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={formError} isRequired my={4}>
            <FormLabel>Password</FormLabel>
            <Input onChange={hundleInputChange} size={{ base: "md", md: "lg" }} name='password' type='password' value={data.password} variant={"filled"} />
            {formError && <FormErrorMessage>{formError}</FormErrorMessage>}
          </FormControl>
          <Box width={"100%"} display={'flex'} alignItems={'center'} my={2}>
            <Text ml={1} fontSize={'14px'} color={'GrayText'} mr={5}>Don't have an account?</Text>
            <Link href='/register' fontWeight={"bold"}>Register</Link>
          </Box>
          <Button onClick={hundleClick} background={'black'} color={'white'} width={"120px"}>{isLoading ? <Spinner /> : "Login"}</Button>
        </Box>

      </Box>
      <Box
        bg={'black'} width={"50%"} height={{ base: "100svh", lg: "100vh" }} display={{ base: "none", lg: "flex" }}
        alignItems={"center"} justifyContent={"center"}
      >
        <Image src={loginSvg} maxW={650} width={"80%"} alt='error' />
      </Box>
    </Box>
  )
}

export default Login