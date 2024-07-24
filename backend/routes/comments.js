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
 * !-Method= GET
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS id:UUID
 * * -BODY= NULL
 * * -QEURY= NULL
 * ? -RESPONSE=  200:[OK] => {user:{}}
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.patch('/:id', async (req, res) => {
    res.sendStatus(200)
});
/************************************************************************************
 * !-url= http://localhost:5000/api/users/:id
 * !-Method= GET
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS id:UUID
 * * -BODY= NULL
 * * -QEURY= NULL
 * ? -RESPONSE=  200:[OK] => {user:{}}
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.delete('/:id', async (req, res) => {
    res.sendStatus(200)
});

export default router;