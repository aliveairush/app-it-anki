import { Router } from 'express';
import { Post } from 'server-models';
import { PostDto } from 'shared-types';

export const postsRouter = Router();

postsRouter.get('/', async (req, res, next) => {
  try {
    // lean - convert to JS
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    const data: PostDto[] = posts.map((d) => ({
      id: d._id.toString(),
      title: d.title,
      body: d.body,
      createdAt: d.createdAt.toISOString(),
      updatedAt: d.updatedAt.toISOString(),
    }));
    res.json(data);
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
    const dto: PostDto = {
      id: created._id.toString(),
      title: created.title,
      body: created.body,
      createdAt: created.createdAt.toISOString(),
      updatedAt: created.updatedAt.toISOString(),
    };
    res.status(201).json({ item: dto });
  } catch (err) {
    if ((err as any).name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: 'Validation error', details: err });
    }
    next(err);
  }
});
