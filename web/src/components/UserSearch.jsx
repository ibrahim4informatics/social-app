import { Avatar, Box, Link } from '@chakra-ui/react'
import React from 'react'

const UserSearch = ({ username, id }) => {
    return (

        <Box my={2} rounded={'md'} bg={"#F1F1F1"} display={'flex'} alignItems={'center'} w={"100%"} px={2} py={4} >
            <Avatar name={username} />
            <Link fontWeight={'bold'} ml={2} href={`/users/${id}`}>{`@${username}`}</Link>
        </Box>

    )
}

export default UserSearch