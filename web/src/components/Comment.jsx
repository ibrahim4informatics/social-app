import React, { useState } from 'react';
import { Avatar, Box, FormControl, IconButton, Input, InputGroup, Text } from '@chakra-ui/react'
import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { fetcher } from '../axios.conf';
const Comment = ({ id, content, user }) => {
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [updatedComment, setUpdatedComment] = useState({ content: "", err: "" });
    const hundleDeleteComment = async () => {
        try {

            const res = await fetcher.delete(`/api/comments/${id}`);
            if (res.status === 200) {
                // todo some notification
                return
            }

        }
        catch (err) {
            console.log(err)
            return
        }
    }

    const hundleInputChange = (e) => {
        setUpdatedComment({ ...updatedComment, content: e.target.value });
    }
    const hundleUpdateComment = async () => {
        if (updatedComment.content.trim().length < 3 || !updatedComment.content) {
            return setUpdatedComment({ ...updatedComment, err: "comment must contain at least 3 characters" });
        }

        try {

            const res = await fetcher.patch(`/api/comments/${id}`, { content: updatedComment.content });
            if (res.status === 200) {
                return setIsInEditMode(false);
            }

        }

        catch (err) {
            console.log(err);
            return
        }
    }
    return (
        <Box my={3} px={2} py={3} rounded={'md'} w={"100%"} bg={`#F1F1F1`}>
            <Box display={'flex'} alignItems={'center'}>
                <Avatar size={'sm'} name={user.username} />
                <Link to={user.id === localStorage.getItem('user_id') ? '/profile' : `/users/${user.id}`}><Text ml={2} color={'black'} fontWeight={'bold'}>@{user.username}</Text></Link>
                {user.id === localStorage.getItem('user_id') &&
                    <Box ms={'auto'}>
                        {isInEditMode ? <IconButton size={'sm'} onClick={hundleUpdateComment} colorScheme='green' icon={<AiOutlineCheck />} /> : <IconButton mx={1} size={'sm'} onClick={() => setIsInEditMode(true)} colorScheme='purple' icon={<AiOutlineEdit />} />}
                        <IconButton size={'sm'} mx={1} onClick={hundleDeleteComment} colorScheme='red' icon={<AiOutlineDelete />} />
                    </Box>
                }
            </Box>
            <Box mt={2} px={2}>
                {
                    isInEditMode ? (
                        <FormControl>
                            <InputGroup>
                                <Input variant={'filled'} value={updatedComment.content || content} onChange={hundleInputChange} placeholder='type you comment😁' /></InputGroup>
                        </FormControl>

                    )
                        : <Text>{content}</Text>
                }
            </Box>
        </Box>
    )
}

export default Comment