import bcrypt,{hash} from 'bcrypt';


export const hashPassword = async (password) => {
    const saltRounds = 10;

    try {
        const hashedPassword = await hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Something went wrong ' + error);
    }
}
