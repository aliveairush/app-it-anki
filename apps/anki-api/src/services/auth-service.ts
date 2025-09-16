import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import { signAccessToken } from '../utils/jwt';

export const registerUser = async (user: {
  email: string;
  password: string;
}) => {
  const existingUserWithSameEmail = await UserModel.findOne({
    email: user.email,
  });

  if (existingUserWithSameEmail) {
    throw new Error('User with existingUserWithSameEmail');
  }

  // second param is salt
  const hashPassword = await bcrypt.hash(user.password, 4);
  const newCreatedUser = await UserModel.create({
    ...user,
    passwordHash: hashPassword,
    activationLink: 'JUST TEST', // TODO for future
  });

  // TODO send activation link

  const accessToken = signAccessToken(user);

  // TODO save refresh token to database
  return {
    accessToken,
    ...newCreatedUser,
  }
};
