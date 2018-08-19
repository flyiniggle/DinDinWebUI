interface User {
    email: string;
    username: string;
}

function createUser(username: string, email: string): User {
    return {
        username,
        email
    }
};

export default User;
export { createUser };