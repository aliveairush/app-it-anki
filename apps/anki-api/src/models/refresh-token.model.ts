import { model, Schema , InferSchemaType } from 'mongoose';

const refreshTokenSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: { type: String, required: true },
  },

);

export type RefreshTokenDoc = InferSchemaType<typeof refreshTokenSchema>
export const RefreshToken = model('RefreshToken', refreshTokenSchema);
