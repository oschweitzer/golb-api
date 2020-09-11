const info = () => 'Welcome to Golb API.';

const article = async (parent, args, context) =>
  await context.prisma.article.findOne({ where: { id: args.id } });

const Query = {
  info,
  article,
};

export default Query;
