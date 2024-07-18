import { query, Router } from "express";
import prisma from "../config/prisma.config.js";
import isAuthenticated from "../midlewares/isAuthenticated.js";
import uuidValidator from "../helpers/validation/uuidValidator.js";
import { acceptUserFriendRequest, deleteUserProfile, getSingleUserProfile, getUserFriendsList, getUserProfile, sendUserFriendRequest } from '../controllers/users.js'

const router = Router();

/************************************************************************************
 * ?-[] get user information
 * ?-[] update user information
 * ?-[] delete user
 */

/**
 * !-url= http://localhost:5000/api/users
 * !-Method= GET
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS NULL
 * * -BODY= NULL
 * * -QEURY= NULL
 * ? -RESPONSE=  200:[OK] => {user: all user information (check schema)}
 * ?             | 404:[NOT FOUND] =>{msg:"not found"}
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.get("/", isAuthenticated, getUserProfile);
/*********************************************************************************
 * !-url= http://localhost:5000/api/users/send
 * !-Method= POST
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS NULL
 * * -BODY= {rid:uuid (receiver id),}
 * * -QEURY= NULL
 * ? -RESPONSE=  200:[OK] => {msg:string}
 * ?             | 404:[NOT FOUND] =>{msg:"user not found"}
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.patch("/send", isAuthenticated, sendUserFriendRequest);
/************************************************************************************
 * !-url= http://localhost:5000/api/users/accept
 * !-Method= POST
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS NULL
 * * -BODY= {sid:uuid (sender id),}
 * * -QEURY= NULL
 * ? -RESPONSE=  200:[OK] => {msg:string}
 * ?             | 404:[NOT FOUND] =>{msg:"user not found"}
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.patch("/accept", isAuthenticated, acceptUserFriendRequest);
/************************************************************************************
 * !-url= http://localhost:5000/api/users
 * !-Method= DELETE
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS NULL
 * * -BODY= NULL
 * * -QEURY= NULL
 * ? -RESPONSE=  200:[OK] => {msg:string}
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.delete("/", isAuthenticated, deleteUserProfile);
/************************************************************************************
 * !-url= http://localhost:5000/api/users/friends
 * !-Method= GET
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS NULL
 * * -BODY= NULL
 * * -QEURY= username:string
 * ? -RESPONSE=  200:[OK] => {firneds: [ {},{} ] }
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.get("/friends", isAuthenticated, getUserFriendsList);


/************************************************************************************
 * !-url= http://localhost:5000/api/users/search
 * !-Method= GET
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS NULL
 * * -BODY= NULL
 * * -QEURY= username
 * ? -RESPONSE=  200:[OK] => {user:{}}
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.get('/search', async (req, res) => {

  const { user_id } = req;
  const { page, username } = query;
  try {
    if (!page) return res.status(400).json({ msg: 'invalid url endpoint' });

    const users = await prisma.user.findMany({
      where: { NOT: { id: user_id }, ...(username ? { username: { contains: `${username}` } } : {}) },
      select: { username: true, id: true },
      orderBy:{username:'asc', createdAt:'desc'},
      take: 25,
      skip: (page - 1) * 25
    });

  }
  catch (err) {
    return res.status(500).json(({ msg: err || `unknown server error` }));
  }


})

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
router.get("/:id", isAuthenticated, getSingleUserProfile);
export default router;