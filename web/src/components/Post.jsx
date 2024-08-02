import React, { useContext } from 'react'
import { Avatar, Box, Image, Text,Link, Button } from '@chakra-ui/react'
import { AiOutlineComment, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { UserContext } from '../contexts/UserContext';
const Post = ({caption, user, picture, id }) => {
    const [userLooged,setUser] = useContext(UserContext);
    return (
        <Box rounded={'md'} border={'0.04px solid rgba(0,0,0,.1)'} bg={'white'} my={2} w={'100%'}>
            <Box px={2} py={3} display={'flex'} alignItems={'center'}>
                <Avatar name={user.username} />
                <Link href={`/users/${user.id}`} ml={2} fontSize={14} fontWeight={'bold'}>{user.username}</Link>
            </Box>
            <Box>
                {caption && <Box ml={2} py={2} px={1}>{caption}</Box>}
                {picture && <Image loading='lazy' src={picture} objectFit={'contain'} width={"100%"} />}
            </Box>
            <Box py={2} display={'flex'} width={'100%'} justifyContent={'space-evenly'} alignItems={'center'}>
                <Link display={'flex'} alignItems={'center'} color={'purple.400'} fontWeight={'bold'} fontSize={20} href={`/${id}`}><AiOutlineComment fontSize={30} /></Link>
                {
                    userLooged.id === user.id ? (
                        <>
                            <Link display={'flex'} alignItems={'center'} color={'purple.400'} fontWeight={'bold'} fontSize={20} href={`/${id}`}><AiOutlineEdit fontSize={30} /></Link>
                            <Link bg={'none'} as={Button} onClick={()=> {console.log('delete post id :', id)}} display={'flex'} alignItems={'center'} color={'red.400'} fontWeight={'bold'} fontSize={20} href={`/${id}`}><AiOutlineDelete fontSize={30} /></Link>
                        </>
                    )
                    : null
                }
            </Box>
        </Box>
    )
}

export default Post