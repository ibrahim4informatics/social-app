import uuidValidator from "../helpers/validation/uuidValidator.js";
import prisma from '../config/prisma.config.js';
import usernameValidation from '../helpers/validation/usernameValidation.js';
const getUserProfile = async (req, res) => {
    const { user_id: id } = req;
    try {
        const { password, ...user } = await prisma.user.findUnique({
            where: { id },
            include: {
                posts: {
                    include: { comments: { include: { user: true } } },
                },
                followers: {
                    select: {
                        id: true, username: true,
                    },
                    orderBy: { username: 'asc' }
                },
                following: {
                    select: {
                        id: true, username: true,
                    },
                    orderBy: { username: 'asc' }
                }
            },
        });
        if (!user) throw new Error("user doesn't exist");
        return res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ msg: err || "unknown server error" });
    }
}


const followUser = async (req, res) => {
    const { user_id } = req;
    const { id: following_id } = req.params;
    if (!uuidValidator(following_id)) return res.status(400).json({ msg: 'invalid url request' });
    try {

        const followingUser = await prisma.user.findUnique({ where: { id: following_id, followers: { none: { id: user_id } } } });
        if (!followingUser) return res.status(404).json({ msg: `can not find or follow this user` });
        await prisma.user.update({ where: { id: user_id }, data: { following: { connect: { id: followingUser.id } } } });
        return res.status(200).json({ msg: `you just start following ${followingUser.username}` })
    }
    catch (err) {
        return res.status(500).json({ msg: err || 'unknown server error' })
    }
}

const unfollowUser = async (req, res) => {
    const { user_id } = req;
    const { id: following_id } = req.params;
    if (!uuidValidator(following_id)) return res.status(400).json({ msg: 'invalid url request' });
    try {

        const followingUser = await prisma.user.findUnique({ where: { id: following_id, followers: { some: { id: user_id } } } });
        if (!followingUser) return res.status(404).json({ msg: `can not find or unfollow this user` });
        await prisma.user.update({ where: { id: user_id }, data: { following: { disconnect: { id: followingUser.id } } } });
        return res.status(200).json({ msg: `you just unfollowed ${followingUser.username}` })
    }
    catch (err) {
        return res.status(500).json({ msg: err || 'unknown server error' })
    }
}


const deleteUserProfile = async (req, res) => {
    const { user_id } = req;
    try {
        await prisma.user.delete({ where: { id: user_id } });
        res.cookie("access-token", null, { maxAge: 0 });
        res.cookie("refresh-token", null, { maxAge: 0 });
        return res.status(200).json({ msg: `user deleted successfully` });
    } catch (err) {
        return res.status(500).json({ msg: err || `unknown server error` });
    }
}
const getSingleUserProfile = async (req, res) => {
    const { id } = req.params;
    const { user_id } = req;
    if (!uuidValidator(id)) return res.status(400).json({ msg: `invalid param` })
    if (id === user_id) return res.status(302).json({ msg: 'need to go to profile route' })
    try {
        const { password, email, posts, ...user } = await prisma.user.findUnique({
            where: {
                id
            },
            include: { followers: true, following: true, posts: { include: { comments: { include: { user: { select: { id: true, username: true } } } } } } }
        })
        let i = 0;
        while (i < user.followers.length && user_id !== user.followers[i].id) {
            i++
        }
        if (i >= user.followers.length) {
            return res.status(200).json({ user, followed: false });
        }
        else {
            return res.status(200).json({ user: { ...user, posts }, followed: true })
        }

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err || `uknown server error` });
    }
}
const searchForUsers = async (req, res) => {
    const { user_id } = req;
    const { page, username } = req.query;
    try {

        if (!page) return res.status(400).json({ msg: 'invalid url endpoint' });
        if (!usernameValidation(username)) return res.status(400).json({ msg: `invalid data provided` });

        const users = await prisma.user.findMany({
            where: { NOT:{id:user_id}, ...(username ? { username: { contains: `${username}` } } : {}) },
            select: { username: true, id: true },
            orderBy: [{ username: 'asc' }, { createdAt: 'desc' }],
            take: 25,
            skip: (page - 1) * 25
        });

        return res.status(200).json({ users })

    }
    catch (err) {
        return res.status(500).json(({ msg: err || `unknown server error` }));
    }
}
export {
    getUserProfile, followUser, unfollowUser,
    deleteUserProfile, getSingleUserProfile, searchForUsers
}