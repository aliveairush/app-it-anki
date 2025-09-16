import { model, Schema , InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, unique: true, index: true, required: true },
    passwordHash: { type: String, required: true },
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String}
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

export type UserDoc = InferSchemaType<typeof userSchema>
export const UserModel = model('User', userSchema);
