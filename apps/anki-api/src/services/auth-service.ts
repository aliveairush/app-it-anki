import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import {
  signAccessToken,
  signRefreshToken,
  verifyAccess,
  verifyRefresh,
} from '../utils/jwt';
import { sendActivationEmail } from './mail-service';
import { RefreshTokenModel } from '../models/refresh-token.model';
import { UserDto } from '../dtos/user.dto';
import { ApiError } from '../exceptions/api-error';

export const registerUser = async (user: {
  email: string;
  password: string;
}) => {
  const existingUserWithSameEmail = await UserModel.findOne({
    email: user.email,
  });

  if (existingUserWithSameEmail) {
    throw ApiError.BadRequest('User already exists');
  }

  // second param is salt
  const hashPassword = await bcrypt.hash(user.password, 4);
  const generatedActivationLink = 'RANDOM'; // generate by uuid
  const newCreatedUserDoc = await UserModel.create({
    ...user,
    passwordHash: hashPassword,
    activationLink: generatedActivationLink, // TODO for future
  });

  await sendActivationEmail(user.email, generatedActivationLink);

  const publicUserData: UserDto = new UserDto({
    email: newCreatedUserDoc.email,
    isActivated: newCreatedUserDoc.isActivated,
  });
  console.log('publicUserData', publicUserData);
  const accessToken = signAccessToken({ ...publicUserData });
  const refreshToken = signRefreshToken({ ...publicUserData });
  await saveRefreshToken(newCreatedUserDoc._id, refreshToken);

  return {
    user: publicUserData,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

export async function loginUser(email: string, password: string) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw ApiError.BadRequest('User does not exist');
  }

  const isPassEqual = await bcrypt.compare(password, user.passwordHash);
  if (!isPassEqual) {
    throw ApiError.BadRequest('Incorrect password');
  }

  const userDto = new UserDto(user);
  const accessToken = signAccessToken({ ...userDto });
  const refreshToken = signRefreshToken({ ...userDto });
  await saveRefreshToken(user._id, refreshToken);

  return {
    user: userDto,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
}

export async function logout(refreshToken: string) {
  if (!refreshToken) {
    return;
  }
  await RefreshTokenModel.deleteOne({ refreshToken });
}

export async function refreshAccessToken(refreshToken: string) {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }
  const userData = verifyRefresh(refreshToken);
  const tokenFromDb = await RefreshTokenModel.findOne({ refreshToken });

  if (!userData || !tokenFromDb) {
    throw ApiError.UnauthorizedError();
  }

  const user = await UserModel.findOne({ email: userData.email });
  const userDto = new UserDto(user);
  const accessToken = signAccessToken({ ...userDto });
  const newRefreshToken = signRefreshToken({ ...userDto });
  await saveRefreshToken(user._id, newRefreshToken);

  return {
    user: userDto,
    tokens: {
      accessToken,
      newRefreshToken,
    },
  };
}

async function saveRefreshToken(userId, refreshToken: string) {
  const foundToken = await RefreshTokenModel.findOne({ user: userId });

  if (foundToken) {
    foundToken.refreshToken = refreshToken;
    return foundToken.save();
  }
  const newToken = await RefreshTokenModel.create({
    user: userId,
    refreshToken: refreshToken,
  });
  return newToken;
}
