import React from 'react'
import Sidebar from './Sidebar'
import { Box } from '@chakra-ui/react'

const Layout = ({children}) => {
  return (
    <>
        <Sidebar/>
        <Box ml={{base:0, md:75, lg:220}} mb={{base:100, md:0}} w={{base:"100%", md:"calc(100% - 75px)", lg:"calc(100% - 220px)"}}>
            <Box pos={'sticky'} top={0} left={0} zIndex={100} bg={'white'} px={2} color={'purple.400'} shadow={'md'} mb={2} py={1} fontSize={22} fontWeight={'bold'} letterSpacing={10} display={{base:'block', md:"none"}}>OUTSTAGRAM</Box>
            {children}
        </Box>
    </>
  )
}

export default Layout