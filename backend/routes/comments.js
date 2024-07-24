import { Router } from "express";
import prisma from '../config/prisma.config.js';
import uuidValidator from "../helpers/validation/uuidValidator.js";
import domPurify from "dompurify";
/**
 * 
 * TODO: user can post comment on post | user can delete his own comment | user can update his comment 
 *
 * */

const router = Router();

/************************************************************************************
 * !-url= http://localhost:5000/api/comments
 * !-Method= POST
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS = NULL
 * * -BODY= {content, post_id}
 * * -QEURY= NULL
 * ? -RESPONSE=  201:[CREATED] => {comment:{}}
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.post('/', async (req, res) => {
    const { user_id } = req;
    const { post_id, content } = req.body;
    if (!uuidValidator(post_id)) return res.status(400).json({ msg: "invalid data" });
    try {
        const user = await prisma.user.findUnique({ where: { id: user_id } });
        if (!user) return res.status(400).json({ msg: "can not perform this action" });
        const post = await prisma.post.findUnique({ where: { id: post_id, user: { followers: { some: { id: user_id } } } } });
        if (!post) return res.status(404).json({ msg: "can not fin post" });
        const comment = await prisma.comment.create({ data: { content: domPurify.sanitize(content) || null, user_id, post_id } });
        return res.status(201).json({ comment });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err || "unknown server error" });
    }
});
/************************************************************************************
 * !-url= http://localhost:5000/api/users/:id
 * !-Method= PATCH
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS id:UUID
 * * -BODY= {content}
 * * -QEURY= NULL
 */
router.patch('/:id', async (req, res) => {

    const { user_id } = req;
    const { id } = req.params;
    const { content, post_id } = req.body;
    if (!uuidValidator(post_id) || !uuidValidator(id)) return res.status(400).json({ msg: "invalid params passed" });
    const criteriaComment = { id, user_id, post_id };
    try {

        const user = await prisma.user.findUnique({ where: { id: user_id } });
        if (!user) return res.status(403).json({ msg: "can not perform this action" });
        const comment = await prisma.comment.findUnique({ where: criteriaComment });
        if (!comment) return res.status(404).json({ msg: "can not find comment" });

        await prisma.comment.update({ where: criteriaComment, data: { content: domPurify.sanitize(content) } });
        return res.status(200).json({ msg: "comment update suceess" });

    }
    catch (err) {
        return res.status(500).json({ msg: err || "unknown server error" });
    }
});
/************************************************************************************
 * !-url= http://localhost:5000/api/comments/:id
 * !-Method= DELETE
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS id:UUID
 * * -BODY= NULL
 * * -QEURY= NULL
 */
router.delete('/:id', async (req, res) => {
    const { user_id } = req;
    const { id } = req.params;
    if (!uuidValidator(id)) return res.status(400).json({ msg: "invalid url parameter" });
    const commentCrieria = { id: domPurify.sanitize(id), user_id: domPurify.sanitize(user_id) }
    try {
        const comment = await prisma.comment.findUnique({ where: commentCrieria });
        if (!comment) return res.status(404).json({ msg: "can not find this comment" });
        await prisma.comment.delete({ where: commentCrieria });
        return res.status(200).json({ msg: "comment delete success" });
    }
    catch (err) {
        return res.sendStatus(500).json({ msg: err || "unknown server error" });
    };
});

export default router;