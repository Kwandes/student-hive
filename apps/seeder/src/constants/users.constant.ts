import { IUser } from '@student-hive/interfaces';
import { authUsers } from './auth-users.constant';
import { classes } from './classes.constant';

export const users: IUser[] = [
  {
    userId: '4dd17881-3ad2-4a35-a9b6-79703addae8c',
    name: 'Learnus',
    lastname: 'Genericus',
    birthdate: new Date('2001-09-11'),
    classes: [
      classes.databases,
      classes.developmentOfSmallSystems,
      classes.developmentOfLargeSystems,
    ],
    authUser: authUsers[0],
    authUserId: authUsers[0].authUserId,
  },
  {
    userId: 'af6b0787-906d-499b-ac7f-c84aceaab185',
    name: 'Nerdus',
    lastname: 'Generico',
    birthdate: new Date('2001-09-11'),
    classes: [
      classes.databases,
      classes.developmentOfSmallSystems,
      classes.developmentOfLargeSystems,
    ],
    authUser: authUsers[1],
    authUserId: authUsers[1].authUserId,
  },
  {
    userId: 'd62f1a08-b3f7-420a-9d7e-7961d2ee79d4',
    name: 'Disciplus',
    lastname: 'Genericuser',
    birthdate: new Date('2001-09-11'),
    classes: [
      classes.databases,
      classes.developmentOfSmallSystems,
      classes.developmentOfLargeSystems,
    ],
    authUser: authUsers[2],
    authUserId: authUsers[2].authUserId,
  },
  {
    userId: '8ffdbc6f-6d87-486b-a469-c1582e4aa3ed',
    name: 'Katto',
    lastname: 'Macgonnagall',
    birthdate: new Date('1970-01-01'),
    classes: [
      classes.databases,
      classes.developmentOfSmallSystems,
      classes.developmentOfLargeSystems,
      classes.testing,
    ],
    authUser: authUsers[3],
    authUserId: authUsers[3].authUserId,
  },
  {
    userId: '43ecdb13-8deb-4769-aa5a-a15136280848',
    name: 'Magister',
    lastname: 'Dumbeldore',
    birthdate: new Date('1970-01-01'),
    classes: [],
    authUser: authUsers[4],
    authUserId: authUsers[4].authUserId,
  },
];
