import bcrypt from 'bcrypt';

const hash = (hashPassword: string) => {
    const salt = parseInt(process.env.SALT_ROUNDS as string, 10);
    return bcrypt.hashSync(`${hashPassword + process.env.BCRYPT_PASSWORD}`,salt);
  };
  
  export default hash;
