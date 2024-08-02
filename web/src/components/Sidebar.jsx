import { Box, Link, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Text, Image } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUser, FiPlus, FiMenu, FiSearch } from "react-icons/fi";
import React from 'react'

const Sidebar = () => {
    return (
        <Box
            display={'flex'} flexDir={{ base: "row", md: "column" }} pos={"fixed"} className={"sidebar-position"}
            bg={'purple.600'} w={{ base: "100%", md: 75, lg: 220 }} px={{ base: 4 }} py={{ base: 4 }} alignItems={{ base: "center" }} justifyContent={{ base: "space-evenly", md: "flex-start" }}
        >
            <Box my={2} display={{ base: "none", md: "block" }} color={'white'}>
                <Box textAlign={'center'} alignItems={'center'} justifyContent={'center'} fontFamily={'hind'} fontSize={{ md: "20px", lg: "30px" }} rounded={'md'} p={4} fontWeight={'bold'} display={'flex'} width={{ md: "30px", lg: "50px" }} h={{ md: "30px", lg: "50px" }} bg={'purple.500'}>O</Box>
            </Box>
            <Link
                as={NavLink} display={'flex'} alignItems={'center'} p={2} to={'/'} width={{ base: 'auto', lg: "100%" }} mt={{ base: 0, md: 'auto' }} mb={{ base: 0, md: 2 }} rounded={'md'} textAlign={'center'} fontSize={30} color={"white"}
            >

                <FiHome />
                <Text display={{ base: "none", lg: "block" }} fontSize={16} ml={2}>Home</Text>

            </Link>
            <Link
                as={NavLink} display={'flex'} alignItems={'center'} p={2} to={'/search'} width={{ base: 'auto', lg: "100%" }} my={{ base: 0, md: 2 }} rounded={'md'} textAlign={'center'} fontSize={30} color={"white"}
            >

                <FiSearch />
                <Text display={{ base: "none", lg: "block" }} ml={2} fontSize={16}>Search</Text>

            </Link>
            <Link
                as={NavLink} display={'flex'} alignItems={'center'} p={2} to={'/add'} width={{ base: 'auto', lg: "100%" }} my={{ base: 0, md: 2 }} rounded={'md'} textAlign={'center'} fontSize={30} color={"white"}
            >

                <FiPlus />
                <Text display={{ base: "none", lg: "block" }} ml={2} fontSize={16}>Create</Text>

            </Link>
            <Link
                as={NavLink} display={'flex'} alignItems={'center'} p={2} to={'/profile'} width={{ base: 'auto', lg: "100%" }} mb={{ base: 0, md: 'auto' }} rounded={'md'} textAlign={'center'} fontSize={30} color={"white"}
            >

                <FiUser />
                <Text display={{ base: "none", lg: "block" }} ml={2} fontSize={16}>Profile</Text>

            </Link>
            <Menu>
                <MenuButton width={{ base: 'auto', lg: "100%" }} mt={'auto'} color={'white'} fontSize={30} p={"10px"} rounded={'md'}>
                    <Box w={"100%"} h={"100%"} display={'flex'} alignItems={'center'}><FiMenu />
                        <Text display={{ base: "none", lg: "block" }} ml={2} fontSize={16}>Menu</Text></Box>
                </MenuButton>
                <MenuList border={'none'} mb={{ base: 4, md: 0 }} ml={{ base: 0, md: 20 }} bg={"black"} color={"white"}>
                    <MenuItem bg={'black'} >
                        <Link color={'red'}>Log-out</Link>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    )

}

{/* <Link p={2} rounded={'md'} bg={"#333"} textAlign={'center'} fontSize={30} color={"white"}> <NavLink> <FiMenu /> </NavLink> </Link> */ }

export default Sidebar