import { IUser } from '@student-hive/interfaces';
import { authUsers } from './auth-users.constant';

export const users: IUser[] = [
  {
    userId: '4dd17881-3ad2-4a35-a9b6-79703addae8c',
    name: 'Studunt',
    lastname: 'Macgonnagall',
    birthdate: new Date('2001-09-11'),
    authUser: authUsers[0],
    authUserId: authUsers[0].authUserId,
  },
  {
    userId: '8ffdbc6f-6d87-486b-a469-c1582e4aa3ed',
    name: 'Magister',
    lastname: 'Dumbeldore',
    birthdate: new Date('1970-01-01'),
    authUser: authUsers[1],
    authUserId: authUsers[1].authUserId,
  },
];
