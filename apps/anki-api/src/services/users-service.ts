import { UserModel } from '../models/user.model';

export async function getAllUsers() {
  const users = await UserModel.find();
  return users;
}
