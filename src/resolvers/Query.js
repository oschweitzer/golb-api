const info = () => 'Welcome to Golb API.';

const findMany = async (
  where,
  { skip, take, orderBy },
  schemaContext,
  collectionName
) => {
  const collection = await schemaContext.findMany({
    where,
    skip,
    take,
    orderBy,
  });

  const count = await schemaContext.count({ where });

  let res = {};
  res[collectionName] = collection;
  res.count = count;

  return res;
};

// -------- Article ----------------------

const articles = async (parent, args, context) => {
  const where = args.filter
    ? {
        OR: [
          { title: { contains: args.filter } },
          { content: { contains: args.filter } },
        ],
      }
    : {};

  return await findMany(where, args, context.prisma.article, 'articles');
};

const article = async (parent, args, context) =>
  await context.prisma.article.findOne({ where: { id: args.id } });

// -------- User ----------------------

const users = async (parent, args, context) => {
  const where = args.filter
    ? {
        OR: [
          { name: { contains: args.filter } },
          { email: { contains: args.filter } },
        ],
      }
    : {};

  return await findMany(where, args, context.prisma.user, 'users');
};

const user = async (parent, args, context) =>
  await context.prisma.user.findOne({ where: { id: args.id } });

// -------- Comment ----------------------

const comments = async (parent, args, context) => {
  const where = args.filter
    ? {
        OR: [{ content: { contains: args.filter } }],
      }
    : {};

  return await findMany(where, args, context.prisma.comment, 'comments');
};
const comment = async (parent, args, context) =>
  await context.prisma.comment.findOne({ where: { id: args.id } });

// -------- Vote ----------------------

const votes = async (parent, args, context) => {
  let where = {};
  if (args.filter) {
    if (args.filter.voteId) {
      where = { id: { equals: +args.filter.voteId } };
    }

    if (args.filter.articleId) {
      where = { article: { id: { equals: +args.filter.articleId } } };
    }

    if (args.filter.userId) {
      where = { user: { id: { equals: +args.filter.userId } } };
    }
  }
  return await findMany(where, args, context.prisma.vote, 'votes');
};
const vote = async (parent, args, context) =>
  await context.prisma.vote.findOne({ where: { id: args.id } });

const Query = {
  info,
  articles,
  article,
  users,
  user,
  comments,
  comment,
  votes,
  vote,
};

export default Query;
