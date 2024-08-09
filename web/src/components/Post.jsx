import React, { useState, useContext } from 'react'
import { Avatar, Box, Image, Text, Link, Input, IconButton, FormControl, FormLabel, Menu, MenuButton, MenuList, MenuItem, Button, FormErrorMessage } from '@chakra-ui/react'
import { AiOutlineComment, AiOutlineEdit, AiOutlineDelete, AiOutlineCheck, AiOutlineMore } from "react-icons/ai";
import { UserContext } from '../contexts/UserContext';
import { fetcher } from '../axios.conf';
import { useNavigate } from 'react-router-dom';
const Post = ({ caption, user, picture, id }) => {

    const [inEditingMode, setInEditingMode] = useState(false);
    const [errors, setErrors] = useState({ cpatioon: '', file: '' })
    const [current_user, setCurentUser] = useContext(UserContext);
    const navigate = useNavigate()
    const hundleSubmit = () => setInEditingMode(false);
    const [postData, setPostData] = useState({})
    const hundleDelete = async () => {
        try {

            const res = await fetcher.delete(`/api/posts/${id}`);
            setCurentUser({ ...current_user, posts: current_user.posts.filter(post => post.id !== id) });
            return;
        }
        catch (err) {
            console.log(`error: ${err}`);
            return;
        }
    }
    const hundleFileInputChange = (e) => {
        setPostData(prev => ({ ...prev, file: e.target.files[0] }));
        return;

    }

    const hundleInputChange = (e) => {
        if (e.target.value.trim().length > 3) {
            setPostData(prev => ({ ...prev, caption: e.target.value }));
            return;
        }
        return;
    }
    return (
        <Box px={2} rounded={'md'} border={'0.04px solid rgba(0,0,0,.1)'} bg={'white'} my={2} w={'100%'}>
            <Box px={2} py={3} display={'flex'} alignItems={'center'}>
                <Avatar name={user.username} />
                <Link href={`/users/${user.id}`} ml={2} fontSize={14} fontWeight={'bold'}>{user.username}</Link>
                {current_user?.id === user.id ? (
                    inEditingMode ? <IconButton ms={'auto'} mr={2} size={'sm'} colorScheme='green' icon={<AiOutlineCheck />} onClick={hundleSubmit} /> : <Menu>
                        <MenuButton as={IconButton} icon={<AiOutlineMore />} ms={'auto'} mr={2} />
                        <MenuList>
                            <MenuItem as={Button} onClick={() => setInEditingMode(true)} colorScheme={'gray'}><AiOutlineEdit /> Edit</MenuItem>
                            <MenuItem onClick={hundleDelete} color={'red'} fontWeight={'bold'} as={Button}><AiOutlineDelete /> Delete</MenuItem>
                        </MenuList>
                    </Menu>
                ) : null

                }
            </Box>
            <Box>
                {caption && <Box ml={2} py={2} px={1}>{inEditingMode ? <Input type='text' variant={'outline'} value={caption} /> : <Text>{caption}</Text>}</Box>}
                {(picture && inEditingMode) || (!picture && inEditingMode) ? (
                    <FormControl isInvalid={errors.file} my={2}>
                        <FormLabel>Picture:</FormLabel>
                        <Box cursor={'pointer'} w={"100%"} h={40} border={'4px dashed #9F7AEA'} borderRadius={8} >
                            <input onChange={hundleFileInputChange} type="file" style={{ opacity: 0, width: "100%", height: "100%", cursor: 'pointer' }} />
                            {errors.file ? <FormErrorMessage>{errors.file}</FormErrorMessage> : <Text color={'GrayText'} pos={'absolute'} top={"50%"} left={"50%"} transform={'translate(-50%,-50%)'}>Drop Image Or Click To Change</Text>}
                        </Box>
                    </FormControl>
                ) : <Image loading='lazy' src={picture} objectFit={'fill'} width={"100%"} />}

            </Box>
            <Box py={2} display={'flex'} width={'100%'} justifyContent={'space-evenly'} alignItems={'center'}>
                <Link display={'flex'} alignItems={'center'} color={'purple.400'} fontWeight={'bold'} my={2} href={`/${id}`}><AiOutlineComment fontSize={25} /></Link>

            </Box>
        </Box>
    )
}

export default Post