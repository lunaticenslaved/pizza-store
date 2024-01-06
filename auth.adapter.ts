import { Adapter, AdapterSession, AdapterUser, VerificationToken } from '@auth/core/adapters';
import dayjs from 'dayjs';

const user: AdapterUser = {
  id: 'userId',
  name: 'userName',
  email: 'user@email.ru',
  emailVerified: null,
};

const session: AdapterSession = {
  userId: 'userId',
  sessionToken: 'token',
  expires: dayjs().add(1, 'day').toDate(),
};

let verificationToken: VerificationToken | null = null;

export const adapter: Adapter = {
  createUser(_) {
    return user;
  },
  getUser(_) {
    return user;
  },
  getUserByEmail(_) {
    return user;
  },
  getUserByAccount(_) {
    return user;
  },
  updateUser(_) {
    return user;
  },
  deleteUser(_) {
    return user;
  },
  createSession(_) {
    return session;
  },
  getSessionAndUser(_) {
    return { session, user };
  },
  updateSession(_) {
    return session;
  },
  deleteSession(_) {
    return session;
  },
  createVerificationToken(data) {
    verificationToken = data;
    return data;
  },
  useVerificationToken() {
    return verificationToken;
  },
};
