import jwt from 'jsonwebtoken';
export default (payload) => {
    try {
        const refreshToken = jwt.sign(payload, process.env.REFRESH, { expiresIn: '7d' });
        const accessToken = jwt.sign(payload, process.env.ACCESS, { expiresIn: '5m' });
        return { refreshToken, accessToken };
    }

    catch (err) {
        console.log(err);
        return -1;
    }
}