interface IUser {
    email: string;
    username: string;
}

function createUser(username: string, email: string): IUser {
    return {
        username,
        email
    }
};

export default IUser;
export { createUser };