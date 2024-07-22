import { Router } from "express";
import prisma from '../config/prisma.config.js';
import uploadImage from "../helpers/functions/uploadImage.js";
import isValidImage from "../helpers/validation/isValidImage.js";

const router = Router();

router.get('/', async (req, res) => {
    return res.status(200).json({ id: req.user_id })
})



router.post('/', async (req, res) => {
    const { caption } = req.body;
    const  picture  = req.files?.picture || null
    const { user_id: id } = req;

    if (!caption && !picture) return res.status(400).json({ msg: 'no data to post' });
    let picture_url = null;
    try {


        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return res.status(404).json({ msg: 'can not proceed to this action' });
        if (picture) {
            if(!isValidImage(picture.name)) return res.status(400).json({msg:'invalid image type'})
            picture_url = await uploadImage(picture, id);
        }
        if (picture_url === -1) return res.status(400).json({ msg: 'error while uploading image' });
        const newPost = await prisma.post.create({
            data: {
                user: { connect: { id } },
                picture: picture_url,
                ...(caption !== undefined ? { caption } : {})
            }

        })

        return res.status(201).json({ post: newPost })

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err || "unknown server error" })
    }
})



router.patch('/', async (req, res) => {
    res.sendStatus(200)
})

router.delete('/', async (req, res) => {
    res.sendStatus(200)
})

export default router;