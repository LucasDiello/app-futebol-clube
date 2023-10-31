import * as bcrypt from 'bcryptjs';


const validEmail = 'users@user.com'
const validPassword = 'secret_user'

const loginUser = {
    email: validEmail,
    password: validPassword
}

const notHaveEmail = {
    password: validPassword
}

const notHavePassword = {
    email: validEmail
}

const buildLoginUser = {
    id: 1,
    username: 'User',
    role: 'user',
    email: 'asdasd@hotmail.com',
    password: bcrypt.hashSync('secret_user', 8),
};

const existingUserWithWrongPasswordBody = { email: validEmail, password: 'wrong_password' };


export { loginUser, buildLoginUser, notHaveEmail, notHavePassword, existingUserWithWrongPasswordBody };