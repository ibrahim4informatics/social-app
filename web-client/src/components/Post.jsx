import React from 'react'
import { Avatar, Box, Image, Text,Link } from '@chakra-ui/react'
import { AiOutlineComment } from "react-icons/ai";
const Post = ({caption, user, picture, id }) => {
    return (
        <Box rounded={'md'} border={'0.04px solid rgba(0,0,0,.1)'} bg={'white'} my={2} w={'100%'}>
            <Box px={2} py={3} display={'flex'} alignItems={'center'}>
                <Avatar name={user.username} />
                <Link href={`/users/${user.id}`} ml={2} fontSize={14} fontWeight={'bold'}>{user.username}</Link>
            </Box>
            <Box>
                {caption && <Box ml={2} py={2} px={1}>{caption}</Box>}
                {picture && <Image src={picture} objectFit={'contain'} width={"100%"} />}
            </Box>
            <Box py={2} display={'flex'} width={'100%'} justifyContent={'center'}>
                <Link display={'flex'} alignItems={'center'} color={'purple.400'} fontWeight={'bold'} fontSize={20} href={`/${id}`}><AiOutlineComment /> <Text ml={2}>Comment</Text></Link>
            </Box>
        </Box>
    )
}

export default Post