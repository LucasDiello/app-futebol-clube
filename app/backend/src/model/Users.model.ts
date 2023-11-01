import { compareSync } from 'bcryptjs';
import { generateToken } from '../middleware/auth/jwtValidate';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { IUsersModel, IUserLogin, Token, Role } from '../Interfaces/IUsers';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUsers;

  async login({ email, password }: IUserLogin) : Promise<ServiceResponse<Token>> {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!email || !password) {
      return { status: 'badRequest',
        data: { message: 'All fields must be filled' } };
    }

    const foundUser = await this.model.findOne({ where: { email } });

    if (!foundUser || !emailRegex.test(email) || password.length < 6
    || !compareSync(password, foundUser.dataValues.password)) {
      return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    }

    const { id, username } = foundUser.dataValues;
    const token = generateToken({ id, username });

    return { status: 'successful', data: { token } };
  }

  async loginRole(id: number): Promise<ServiceResponse<Role>> {
    const foundUser = await this.model.findOne({ where: { id } });

    if (!foundUser) {
      return { status: 'notFound', data: { message: 'User not found' } };
    }
    const { role } = foundUser.dataValues;
    return { status: 'successful', data: { role } };
  }
}
