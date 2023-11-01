import { ServiceResponse } from './ServiceResponse';

export interface IUsers {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export type Role = { role : string };
export type Token = { token : string };

export interface IUsersModel {
  login(user: IUserLogin): Promise<ServiceResponse<Token>>;
  loginRole(id : number) : Promise<ServiceResponse<Role>>;
}
