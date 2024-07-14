import bcrypt from 'bcrypt';

export default async (string) => await bcrypt.hash(string, 12); 