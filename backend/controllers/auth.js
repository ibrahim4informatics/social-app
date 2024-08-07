import prisma from '../config/prisma.config.js';
import bcrypt from 'bcrypt';
import emailValidation from "../helpers/validation/emailValidation.js";
import genTokens from "../helpers/functions/genTokens.js";
import strongPassword from "../helpers/validation/strongPassword.js";
import hash from "../helpers/functions/hash.js";
import { authConf } from "../config/cookies.conf.js";
import usernameValidation from '../helpers/validation/usernameValidation.js';
import { crypterToken } from '../helpers/functions/tokenEncryption.js';

const loginUserController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json(({ msg: 'missing data' }));
    if (!emailValidation(email)) return res.status(400).json({ msg: 'information not valid' })

    try {
        const {password: user_password, ...user} = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                first_name: true,
                password:true,
                last_name: true,
                username: true,
                followers: { select: { id: true, username: true } },
                following: { select: { id: true, username: true } },
                posts: { select: { caption: true, picture: true, createdAt: true, } },

            }
        });
        if (!user) return res.status(401).json({ msg: 'invalid email or password' });
        const passCheck = await bcrypt.compare(password, user_password);
        if (!passCheck) return res.status(401).json({ msg: 'invalid email or password' });
        const tokens = genTokens({ id: user.id });
        if (tokens === -1) return res.status(500).json({ msg: 'can not generate tokens' });
        // res.cookie('refresh-token', tokens.refreshToken, authConf.refresh);
        // res.cookie('access-token', tokens.accessToken, authConf.access);
        // return res.status(200).json({ msg: 'user is logged in' })
        if (req.headers['x-platform'] === "MOBILE") {
            return res.status(200).json({ accessToken: crypterToken(tokens.accessToken), refreshToken: crypterToken(tokens.refreshToken) })
        }
        res.cookie('refresh-token', tokens.refreshToken, authConf.refresh);
        res.cookie('access-token', tokens.accessToken, authConf.access);
        return res.status(200).json({ user })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err || 'unknown server error' })
    }
}

const registerUserController = async (req, res) => {
    const { email, username, first_name, last_name, password, confirm } = req.body;
    if (!email || !username || !first_name || !last_name || !password || !confirm) return res.status(400).json({ msg: 'missing data' });
    if (!emailValidation(email)) return res.status(400).json({ msg: `email is not valid` });
    if (!usernameValidation(username)) return res.status(400).json({ msg: `username is not valid` })
    try {

        const userEmail = await prisma.user.findUnique({ where: { email } });
        const userUsername = await prisma.user.findUnique({ where: { username } });
        if (userUsername) return res.status(400).json({ msg: `${username} is in use` });
        if (userEmail) return res.status(400).json({ msg: `${email} is in use` });
        if (password !== confirm) return res.status(400).json({ msg: 'passwords doesn\'t mtach' });
        if (!strongPassword(password)) return res.status(400).json({ msg: 'password is not strong' });

        const newUser = await prisma.user.create({ data: { email, username, first_name, last_name, password: await hash(password) } });
        return res.status(201).json({ user: newUser });

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ err });
    }
}

export {
    loginUserController, registerUserController
}