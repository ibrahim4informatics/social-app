import { Router } from "express";
import { createUserPost, deleteuserPostById, getUserFollowingPostById, getUserFollowingPosts, updateUserPostById } from "../controllers/posts.js";
const router = Router();
/************************************************************************************
 * !-url= http://localhost:5000/api/posts
 * !-Method= GET
 * !-Midlewares= IsAutenticated /midlewares/isAuthenticated.js
 * * -PARAMS :NULL
 * * -BODY= {formdata: (caption:string, picture:image) }
 * * -QEURY= caption:string, page:number
 * ? -RESPONSE=  200:[OK] => {posts, pages:{total:number,current:number}}
 * ?             400:[BAD]=> {msg:string}
 * 
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.get('/', getUserFollowingPosts)
/************************************************************************************
 * !-url= http://localhost:5000/api/posts
 * !-Method= POST
 * !-Midlewares= IsAutenticated /midlewares/isAuthenticated.js
 * * -PARAMS :NULL
 * * -BODY= {formdata: (caption:string, picture:image) }
 * * -QEURY= NULL
 * ? -RESPONSE=  201:[CREATED] => {msg:string}
 * ?             400:[BAD]=> {msg:string}
 * 
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.post('/', createUserPost)
/************************************************************************************
 * !-url= http://localhost:5000/api/posts/:id
 * !-Method= GET
 * !-Midlewares= IsAutenticated /midlewares/isAuthenticated.js
 * * -PARAMS : id:uuid
 * * -BODY= NULL
 * * -QEURY= NULL
 * ? -RESPONSE=  200:[CREATED] => {post:{}}
 * ?             400:[BAD]=> {msg:string}
 * 
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.get('/:id', getUserFollowingPostById)
/************************************************************************************
 * !-url= http://localhost:5000/api/posts/:id
 * !-Method= PATCH
 * !-Midlewares= IsAutenticated /midlewares/isAuthenticated.js
 * * -PARAMS :id:uuid
 * * -BODY= {formdata: (caption:string || null, picture:image || null) }
 * * -QEURY= NULL
 * ? -RESPONSE=  201:[CREATED] => {msg:string}
 * ?             400:[BAD]=> {msg:string}
 * 
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.patch('/:id', updateUserPostById)
/************************************************************************************
 * !-url= http://localhost:5000/api/posts/:id
 * !-Method= DELETE
 * !-Midlewares= IsAutenticated /midlewares/isAuthenticated.js
 * * -PARAMS id:uuid
 * * -BODY= NULL
 * * -QEURY= NULL
 * ? -RESPONSE=   200:[OK] => {msg:string}
 * ?             |404:[NOT FOUND]=> {msg:string}
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.delete('/:id', deleteuserPostById)
export default router;