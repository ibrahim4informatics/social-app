import { Router } from "express";
import jwt from "jsonwebtoken"
import { loginUserController, registerUserController } from '../controllers/auth.js';
import { crypterToken, decrypterToken } from "../helpers/functions/tokenEncryption.js";
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
router.post('/register', registerUserController);
/************************************************************************************
 * !-url= http://localhost:5000/api/auth/refresh (mobile spceifique)
 * !-Method= POST
 * !-Midlewares= NULL
 * * -PARAMS NULL
 * * -BODY= {refreshToken: "encrypted"}
 * * -QEURY= NULL
 * ? -RESPONSE=  200:[User Created] => {access-token:encrypted}
 * ?             400:[BAD]=> {msg:string}
 * ?             | 500:[INTERNAL ERROR]=>{msg:err}
 */

router.post("/refresh-token", async (req, res) => {
    if (req.headers['x-platform'] !== "MOBILE") return res.status(403).json({ msg: "can not get this route" });
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(403).json({ msg: "no token provided" })
    try {

        const token = decrypterToken(refreshToken);
        const { id } = await jwt.verify(token, process.env.REFRESH);
        const newAccessToken = await jwt.sign({ id }, process.env.ACCESS, { expiresIn: "5m" });
        return res.status(200).json({ accessToken: crypterToken(newAccessToken) });

    }
    catch (err) {
        console.log(err)
        return res.status(403).json({ msg: "login again" });
    }
})



export default router;