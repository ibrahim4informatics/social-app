import jwt from 'jsonwebtoken';
import { authConf } from '../config/cookies.conf.js';
import { decrypterToken } from '../helpers/functions/tokenEncryption.js';
const refreshToken = async (req, res, next) => {
    try {

        const { id } = await jwt.verify(req.cookies['refresh-token'], process.env.REFRESH);
        const newAccessToken = jwt.sign({ id }, process.env.ACCESS, { expiresIn: '5m' });
        req.user_id = id
        res.cookie('access-token', newAccessToken, authConf.access);
        next()


    }

    catch (err) {
        return res.status(401).json({ msg: 'log in please!' })
    }
}
export default async (req, res, next) => {
    let token;
    try {

        if (req.headers["x-platform"] === "MOBILE") {
            token = decrypterToken(req.headers["Authorization"]);
        }
        else {
            token = req.cookies['access-token'];
        }
        const { id } = await jwt.verify(token, process.env.ACCESS);
        req.user_id = id;
        next()

    }
    catch (err) {
        if (req.headers['x-platform'] !== "MOBILE") {
            return refreshToken(req,res,next);
        }
        return res.status(401).json({ msg: "invalid or expired token provided" });
    }
}