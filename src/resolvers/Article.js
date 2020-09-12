const author = async (parent, args, context) =>
  await context.prisma.article.findOne({ where: { id: parent.id } }).author();
const comments = async (parent, args, context) =>
  await context.prisma.article.findOne({ where: id.parent.id }).comments();
const votes = async (parent, args, context) =>
  await context.prisma.article.findOne({ where: id.parent.id }).votes();

const Article = {
  author,
  comments,
  votes,
};

export default Article;
