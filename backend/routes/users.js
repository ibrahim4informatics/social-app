import { Router } from "express";
import isAuthenticated from "../midlewares/isAuthenticated.js";
import { deleteUserProfile, followUser, getSingleUserProfile, getUserFriendsList, getUserProfile, searchForUsers, unfollowUser } from '../controllers/users.js'

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


/**
 * !-url= http://localhost:5000/api/users/followers
 * !-Method= GET
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS NULL
 * * -BODY= NULL
 * * -QEURY= NULL
 * ? -RESPONSE=  200:[OK] => {user: all user information (check schema)}
 * ?             | 404:[NOT FOUND] =>{msg:"not found"}
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.get("/followers", isAuthenticated, async(req,res)=>{
  const {user_id} = req;
  try {
    //TODO : get user followers

  }
  catch(err){
    return res.status(500).json({msg: err || 'unknown server error'})
  }
});

/**
 * !-url= http://localhost:5000/api/users
 * !-Method= DELETE
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS NULL
 * * -BODY= NULL
 * * -QEURY= NULL
 * ? -RESPONSE=  200:[OK] => {user: all user information (check schema)}
 * ?             | 404:[NOT FOUND] =>{msg:"not found"}
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.delete('/', isAuthenticated, deleteUserProfile)
/************************************************************************************
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
/*********************************************************************************
 * !-url= http://localhost:5000/api/users/follow/:id
 * !-Method= POST
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS id:uuid user you want to follow
 * * -BODY= NULL
 * * -QEURY= NULL
 * ? -RESPONSE=  200:[OK] => {msg:string}
 * ?             | 404:[NOT FOUND] =>{msg:"user not found"}
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.patch("/follow/:id", isAuthenticated, followUser);
/*********************************************************************************
 * !-url= http://localhost:5000/api/users/unfollow/:id
 * !-Method= POST
 * !-Midlewares= isAuthenticated : /midlewares/isAuthenticated.js|
 * * -PARAMS id:uuid user you want to unfollow
 * * -BODY= NULL
 * * -QEURY= NULL
 * ? -RESPONSE=  200:[OK] => {msg:string}
 * ?             | 404:[NOT FOUND] =>{msg:"user not found"}
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.patch("/unfollow/:id", isAuthenticated, unfollowUser);



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
router.get('/search', searchForUsers)

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