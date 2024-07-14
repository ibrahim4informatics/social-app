import jwt from 'jsonwebtoken';
import { authConf } from '../config/cookies.conf.js';

const refreshToken = async (req, res, next) => {
    try {

        const { id } = await jwt.verify(req.cookies['refresh-token'], process.env.REFRESH);
        const newAccessToken = jwt.sign({ id }, process.env.ACCESS, { expiresIn: '5m' });
        res.cookie('access-token', newAccessToken, authConf.access);
        req.user_id = id
        return next()


    }

    catch (err) {
        return res.status(401).json({ msg: 'log in please!' })
    }
}



export default async (req, res, next) => {
    try {
        const { id } = await jwt.verify(req.cookies['access-token'], process.env.ACCESS);
        req.user_id = id;
        next()

    }
    catch (err) {
        refreshToken(req, res, next)
    }
}