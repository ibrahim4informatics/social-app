import { Router } from "express";
import prisma from '../config/prisma.config.js'
import isAuthenticated from '../midlewares/isAuthenticated.js'
import uuidValidator from "../helpers/validation/uuidValidator.js";

const router = Router();

/**
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
router.get('/', isAuthenticated,async (req, res) => {
    const {user_id:id} = req;
    try {
        const {password,...user} = await prisma.user.findUnique({
            where:{id} , 
            include:{
                posts:{
                    include:{comments:{ include:{user:true} } }
                },
            } 
        });
        if(!user) throw new Error("user doesn't exist");
        return res.status(200).json({user})
    }
    catch (err){
        return res.status(500).json({msg:err || 'unknown server error'})
    }
})
/**
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
router.patch('/send', isAuthenticated,async (req, res) => {
    const {user_id:id} = req;
    const receiver_id = req.body.rid;
    if(!uuidValidator(receiver_id) || id === receiver_id) return res.status(400).json({msg:'invalid data'})
    try {
        const ruser = await prisma.user.findUnique({where:{id:receiver_id, friendof:{ none:{id} } } });
        if(!ruser) return res.status(404).json({msg:"can not send freind request to this user"});
        await prisma.user.update({where:{id} , data:{firends:{connect:{id:ruser.id} } } });
        return res.status(200).json({msg:'friend request sent'})
    }

    catch(err){
        return res.status(500).json({msg:err || 'unknowm server error'})
    }
})
/**
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
router.patch('/accept', isAuthenticated,async (req, res) => {
    const {user_id:id} = req;
    const sender_id = req.body.sid;
    if(!uuidValidator(sender_id) || id === sender_id) return res.status(400).json({msg:'invalid data'})
    try {
        const suser = await prisma.user.findUnique({where:{id:sender_id, friendof:{ some:{id} }, firends:{none: {id} } } });
        if(!suser) return res.status(404).json({msg:"can not accept freind request to this user"});
        await prisma.user.update({where:{id} , data:{firends:{connect:{id:suser.id} } } });
        return res.status(200).json({msg:'friend request accepted'})
    }

    catch(err){
        return res.status(500).json({msg:err || 'unknowm server error'})
    }
})

router.delete('/', async (req, res) => {
    res.sendStatus(200)
})

export default router;