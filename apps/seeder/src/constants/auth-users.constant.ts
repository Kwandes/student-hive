import { IAuthUser, Role } from '@student-hive/interfaces';

// password: abcDEF123
export const authUsers: IAuthUser[] = [
  {
    authUserId: '17631e48-c5de-432f-826e-a1461a2928ed',
    email: 'student@example.com',
    password: '$2b$10$QItH8MlMrmcye0WB1n4SuuMyRAv2gR66C/qpzXAoeTgAI7Ew2dr0K',
    role: Role.student,
  },
  {
    authUserId: '5b5829b4-efd2-4c44-8c2b-648e54768fd7',
    email: 'student2@example.com',
    password: '$2b$10$QItH8MlMrmcye0WB1n4SuuMyRAv2gR66C/qpzXAoeTgAI7Ew2dr0K',
    role: Role.student,
  },
  {
    authUserId: 'e1aee996-3d70-48ad-8d5f-fd99e2d2610c',
    email: 'student3@example.com',
    password: '$2b$10$QItH8MlMrmcye0WB1n4SuuMyRAv2gR66C/qpzXAoeTgAI7Ew2dr0K',
    role: Role.student,
  },
  {
    authUserId: '238777fb-67ff-483f-96a9-24cd993ffb88',
    email: 'teacher@example.com',
    password: '$2b$10$h1PegDvn0XBbESh5b5dJOOZHj.4Ru6s/CPUzlSOm9hv5V6UY3q5GC',
    role: Role.teacher,
  },
  {
    authUserId: '285696d9-1e0c-4f43-a90f-fbe4e874d1e5',
    email: 'admin@example.com',
    password: '$2b$10$h1PegDvn0XBbESh5b5dJOOZHj.4Ru6s/CPUzlSOm9hv5V6UY3q5GC',
    role: Role.admin,
  },
];
