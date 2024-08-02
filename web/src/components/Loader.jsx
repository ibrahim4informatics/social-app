import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
    return (
        <Box w={"100%"} h={'100svh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Spinner size={'xl'} color='purple.400' />
        </Box>
    )
}

export default Loader