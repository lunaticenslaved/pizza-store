import { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  id: string;
  name: string;
  email: string;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
