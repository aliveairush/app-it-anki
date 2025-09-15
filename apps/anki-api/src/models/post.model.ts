import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    body:  { type: String, required: true, trim: true },
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

export const Post = model('Post', postSchema);
