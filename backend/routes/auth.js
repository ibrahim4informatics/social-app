import { Router } from "express";

import { loginUserController, registerUserController } from '../controllers/auth.js'
const router = Router();
/************************************************************************************
 * !-url= http://localhost:5000/api/auth/login
 * !-Method= POST
 * !-Midlewares= NULL
 * * -PARAMS NULL
 * * -BODY= {email:string,password:string}
 * * -QEURY= NULL
 * ? -RESPONSE=  200:[OK] => {msg:string}
 * ?             400:[BAD]=> {msg:string}
 * 
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.post('/login', loginUserController);
/************************************************************************************
 * !-url= http://localhost:5000/api/auth/register
 * !-Method= POST
 * !-Midlewares= NULL
 * * -PARAMS NULL
 * * -BODY= {email:string,password:string,confirm:string,username:string,first_name:string,last_name:string}
 * * -QEURY= NULL
 * ? -RESPONSE=  201:[User Created] => {msg:string}
 * ?             400:[BAD]=> {msg:string}
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */
router.post('/register', registerUserController)

export default router;