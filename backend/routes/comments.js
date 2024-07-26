import { Router } from "express";
import prisma from '../config/prisma.config.js';
import uuidValidator from "../helpers/validation/uuidValidator.js";
import sanitizer from 'sanitizer';
import { createComment, deleteCommentById, updateCommentById } from "../controllers/comments.js";

const { sanitize } = sanitizer;
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
router.post('/', createComment);
/************************************************************************************
 * !-url= http://localhost:5000/api/users/:id
 * !-Method= PATCH
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS id:UUID
 * * -BODY= {content}
 * * -QEURY= NULL
 */
router.patch('/:id', updateCommentById);
/************************************************************************************
 * !-url= http://localhost:5000/api/comments/:id
 * !-Method= DELETE
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS id:UUID
 * * -BODY= NULL
 * * -QEURY= NULL
 */
router.delete('/:id', deleteCommentById);

export default router;