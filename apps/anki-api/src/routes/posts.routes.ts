import { Router } from 'express';
import { Post } from '../models/post.model';

export const postsRouter = Router();

postsRouter.get('/', async (req, res, next) => {
  try {
    // lean - convert to JS
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

postsRouter.post('/', async (req, res, next) => {
  try {
    const { title, body } = req.body ?? {};

    if (!title || !body) {
      return res.status(400).json({ message: 'Title and body is required' });
    }

    const created = await Post.create({ title, body });
    res.status(201).json(created);
  } catch (err) {
    if ((err as any).name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: 'Validation error', details: err });
    }
    next(err);
  }
});
