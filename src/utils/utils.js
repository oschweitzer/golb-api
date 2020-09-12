import { verify } from 'jsonwebtoken';

export const APP_SECRET = 'GraphQL-is-aw3some';

export const getUserId = (context) => {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = verify(token, APP_SECRET);
    return userId;
  }

  throw new Error('Not authenticated');
};
