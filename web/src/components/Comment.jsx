import { Avatar, Box, IconButton, Text } from '@chakra-ui/react'
import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
const Comment = ({ id, content, user }) => {
    const [current_user, setUser] = useContext(UserContext);
    return (
        <Box my={3} px={1} py={3} rounded={'md'} w={"100%"} bg={`#F1F1F1`}>
            <Box display={'flex'} alignItems={'center'}>
                <Avatar size={'sm'} name={user.username} />
                <Text ml={2} color={'black'} fontWeight={'bold'}>@{user.username}</Text>
                {user.id === current_user.id &&
                    <Box ms={'auto'}>
                        <IconButton onClick={()=> console.log('edit comment ', id)} colorScheme='purple' icon={<AiOutlineEdit />} />
                        <IconButton onClick={()=>{console.log('delete comment ', id)}} colorScheme='red' icon={<AiOutlineDelete />} />

                    </Box>
                }
            </Box>
            <Box mt={2} px={2}>
                <Text>
                    {content}
                </Text>
            </Box>
        </Box>
    )
}

export default Comment