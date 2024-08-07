import React, {  useState } from 'react'
import { Avatar, Box, Image, Text, Link, Input, IconButton, FormControl, FormLabel } from '@chakra-ui/react'
import { AiOutlineComment, AiOutlineEdit, AiOutlineDelete, AiOutlineCheck } from "react-icons/ai";

const Post = ({ caption, user, picture, id }) => {

    const [inEditingMode, setInEditingMode] = useState(false);
    const hundleSubmit = () => setInEditingMode(false);
    const hundleFileInputChange = () => null
    return (
        <Box px={2} rounded={'md'} border={'0.04px solid rgba(0,0,0,.1)'} bg={'white'} my={2} w={'100%'}>
            <Box px={2} py={3} display={'flex'} alignItems={'center'}>
                <Avatar name={user.username} />
                <Link href={`/users/${user.id}`} ml={2} fontSize={14} fontWeight={'bold'}>{user.username}</Link>
            </Box>
            <Box>
                {caption && <Box ml={2} py={2} px={1}>{inEditingMode ? <Input type='text' variant={'outline'} value={caption} /> : <Text>{caption}</Text>}</Box>}
                {picture && inEditingMode ? (
                    <FormControl my={2}>
                        <FormLabel>Picture:</FormLabel>
                        <Box cursor={'pointer'} w={"100%"} h={40} border={'4px dashed #9F7AEA'} borderRadius={8} >
                            <input onChange={hundleFileInputChange} type="file" style={{ opacity: 0, width: "100%", height: "100%", cursor: 'pointer' }} />
                            <Text color={'GrayText'} pos={'absolute'} top={"50%"} left={"50%"} transform={'translate(-50%,-50%)'}>Drop Image Or Click To Change</Text>
                        </Box>
                    </FormControl>
                ) : <Image loading='lazy' src={picture} objectFit={'fill'} width={"100%"} />}
            </Box>
            <Box py={2} display={'flex'} width={'100%'} justifyContent={'space-evenly'} alignItems={'center'}>
                <Link display={'flex'} alignItems={'center'} color={'purple.400'} fontWeight={'bold'} fontSize={20} href={`/${id}`}><AiOutlineComment fontSize={30} /></Link>
                {
                    localStorage.getItem('user_id')=== user.id ? (
                        <>
                            {inEditingMode ? <IconButton colorScheme='green' icon={<AiOutlineCheck />} onClick={hundleSubmit} /> : <IconButton icon={<AiOutlineEdit />} colorScheme='purple' onClick={() => setInEditingMode(true)} />}
                            <IconButton icon={<AiOutlineDelete />} onClick={() => { console.log('delete post id :', id) }} colorScheme={'red'} />
                        </>
                    )
                        : null
                }
            </Box>
        </Box>
    )
}

export default Post