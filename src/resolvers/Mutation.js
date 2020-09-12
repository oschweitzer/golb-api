import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getUserId } from '../utils/utils';

const APP_SECRET = process.env.APP_SECRET ?? 'GraphQL-is-aw3some';

const signup = async (parent, args, context) => {
  const password = await hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });
  const token = sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const login = async (parent, args, context) => {
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const postArticle = async (parent, args, context) => {
  const userId = getUserId(context);

  return await context.prisma.article.create({
    data: {
      title: args.title,
      content: args.content,
      author: {
        connect: { id: userId },
      },
    },
    include: {
      author: true,
    },
  });
};

const updateArticle = async (parent, args, context) => {
  getUserId(context);
  return await context.prisma.article.update({
    where: { id: +args.id },
    data: {
      content: args.content,
      title: args.title,
    },
  });
};

const deleteArticle = async (parent, args, context) => {
  getUserId(context);
  return await context.prisma.article.delete({
    where: { id: +args.id },
  });
};

const postComment = async (parent, args, context) => {
  const userId = getUserId(context);
  return await context.prisma.comment.create({
    data: {
      content: args.content,
      author: {
        connect: {
          id: userId,
        },
      },
      article: {
        connect: { id: +args.article.id },
      },
    },
    include: {
      author: true,
      article: true,
    },
  });
};

const updateComment = async (parent, args, context) => {
  getUserId(context);
  return await context.prisma.comment.update({
    where: { id: +args.id },
    data: {
      content: args.content,
    },
  });
};

const deleteComment = async (parent, args, context) => {
  getUserId(context);
  return await context.prisma.comment.delete({
    where: { id: +args.id },
  });
};

const addVote = async (parent, args, context) => {
  const userId = getUserId(context);
  return await context.prisma.vote.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      article: {
        connect: {
          id: +args.article.id,
        },
      },
    },
    include: {
      user: true,
      article: true,
    },
  });
};

const deleteVote = async (parent, args, context) => {
  getUserId(context);
  return await context.prisma.vote.delete({
    where: {
      id: +args.id,
    },
  });
};

const Mutation = {
  signup,
  login,
  postArticle,
  updateArticle,
  deleteArticle,
  postComment,
  updateComment,
  deleteComment,
  addVote,
  deleteVote,
};

export default Mutation;
