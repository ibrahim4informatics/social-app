import prisma from '../config/prisma.config.js';
import uploadImage from "../helpers/functions/uploadImage.js";
import isValidImage from "../helpers/validation/isValidImage.js";
import uuidValidator from '../helpers/validation/uuidValidator.js';
import deleteImage from "../helpers/functions/deleteImage.js";
import ImageNameExtractor from "../helpers/functions/ImageNameExtractor.js";
const getUserFollowingPosts = async (req, res) => {
    const { user_id } = req;
    const { caption, page } = req.query;
    if (!page || Number.parseInt(page) === NaN) return res.status(400).json("missing parameters in url");
    try {
        const user = await prisma.user.findUnique({ where: { id: user_id }, select: { following: { select: { id: true } } } });
        if (!user) return res.status(403).json({ msg: "can not perform this action" });
        const followingIds = user.following.map(f => f.id);
        const postsCount = await prisma.post.count({
            where: {
                ...(caption && { caption: { contains: caption } }),
                user_id: {
                    in: followingIds
                }
            }
        });
        const total = Math.ceil(postsCount / 15);
        if (+page > total) return res.status(404).json({ msg: "can not found informations" });
        const posts = await prisma.post.findMany({
            where: {
                ...(caption && { caption: { contains: caption } }),
                user_id: {
                    in: followingIds
                }
            },
            select: {
                user: {
                    select: {
                        username: true, id: true
                    }
                },

                caption: true,
                picture: true,
                createdAt: true,
                id: true,

                _count: {
                    select: {
                        comments: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 15,
            skip: (-1 + +page) * 15,
        });
        return res.status(200).json({ posts, page: { current: page, total } });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err || "unknown server error" });
    }
}
const createUserPost = async (req, res) => {
    const { caption } = req.body;
    const picture = req.files?.picture || null;
    const { user_id: id } = req;
    if (!caption && !picture) return res.status(400).json({ msg: 'no data to post' });
    let picture_url = null;
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return res.status(404).json({ msg: 'can not proceed to this action' });
        if (picture) {
            if (!isValidImage(picture.name)) return res.status(400).json({ msg: 'invalid image type' });
            picture_url = await uploadImage(picture, id);
        }
        if (picture_url === -1) return res.status(400).json({ msg: 'error while uploading image' });
        const newPost = await prisma.post.create({
            data: {
                user: { connect: { id } },
                picture: picture_url,
                ...(caption !== undefined ? { caption } : {})
            }
        });
        return res.status(201).json({ post: newPost });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err || "unknown server error" });
    }
};
const getUserFollowingPostById = async (req, res) => {
    const { user_id } = req;
    const { id } = req.params;
    if (!uuidValidator(id)) return res.status(400).json({ msg: "invalid url parameter" });
    try {
        const user = await prisma.user.findUnique({ where: { id: user_id } });
        if (!user) return res.status(403).json({ msg: "can not perform this action" });
        const post = await prisma.post.findUnique({
            where: {
                id, user: {
                    followers: { some: { id: user_id } }
                }
            },
            select: {
                id: true,
                caption: true,
                picture: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                comments: {
                    select: {
                        id: true,
                        content: true,
                        user: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                },

            }
        });
        if (!post) return res.status(404).json({ msg: "post can not be found" });
        return res.status(200).json({ post });
    }
    catch (err) {
        return res.status(500).json({ msg: err || "unknown server error" });
    }
}
const updateUserPostById = async (req, res) => {
    const { user_id } = req;
    const { id } = req.params;
    const caption = req.body.caption || null;
    const picture = req.files?.picture;
    let picture_url = null;
    if (!caption && !picture) return res.status(400).json({ msg: `nothing to update` });
    if (!uuidValidator(id)) return res.status(400).json({ msg: "invalid url parameters" });
    try {
        const user = await prisma.user.findUnique({ where: { id: user_id } });
        if (!user) return res.status(403).json({ msg: `can not make this action` });
        const post = await prisma.post.findUnique({ where: { id, user_id } });
        if (!post) return res.status(404).json({ msg: "post is not found" });
        if (picture) {
            await deleteImage(`${user_id}/${ImageNameExtractor(post.picture)}`);
            if (!isValidImage(picture.name)) return res.status(400).json({ msg: "invalid data" });
            picture_url = await uploadImage(picture, user_id);
        }
        await prisma.post.update({ where: { id }, data: { caption, picture: picture_url || post.picture } });
        return res.status(200).json({ msg: `post ${post.id} update success` });
    }
    catch (err) {
        return res.status(500).json({ msg: err || "unknown server error" });
    }
}
const deleteuserPostById = async (req, res) => {
    const { user_id } = req;
    const { id } = req.params
    if (!uuidValidator(id)) return res.status(400).json({ msg: "invalid url parameter" });
    try {
        const user = await prisma.user.findUnique({ where: { id: user_id } });
        if (!user) return res.status(403).json({ msg: "can not perform this action" });
        const post = await prisma.post.findUnique({
            where: {
                id, user_id
            }
        });
        if (!post) return res.status(404).json({ msg: `can not found post to delete` });
        const isDone = await deleteImage(`${user_id}/${ImageNameExtractor(post.picture)}`);
        if (!isDone) return res.status(400).json({ msg: 'error occured when deleting post' });
        await prisma.post.delete({ where: { id } });
        return res.status(200).json({ msg: `post ${post.caption} deleted success` });
    }
    catch (err) {

        return res.status(500).json({ msg: err || "unknown server error" });
    }
}
export {
    getUserFollowingPosts, createUserPost, getUserFollowingPostById,updateUserPostById, deleteuserPostById
}