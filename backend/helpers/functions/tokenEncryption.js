import crypto from 'crypto';
const ENCRYPTION_KEY = Buffer.from(process.env.KRYPT, 'hex');
const IV_LENTGH = 16;

const crypterToken = (token) => {

    const iv = crypto.randomBytes(IV_LENTGH);
    const ciphier = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = ciphier.update(token);
    encrypted = Buffer.concat([encrypted, ciphier.final()])
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;

}

const decrypterToken = (encrypted) => {
    const content = encrypted.split(":");
    const iv = Buffer.from(content.shift(), 'hex');
    let encryptedContent = Buffer.from(content.join(":"), "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedContent);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();

}

export { crypterToken, decrypterToken }