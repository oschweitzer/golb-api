const article = async (parent, args, context) =>
  await context.prisma.vote.findOne({ where: { id: parent.id } }).article();

const user = async (parent, args, context) =>
  await context.prisma.vote.findOne({ where: { id: parent.id } }).user();

const Vote = {
  article,
  user,
};

export default Vote;
