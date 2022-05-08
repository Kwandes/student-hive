import { IAttendance } from '@student-hive/interfaces';
import { authUsers } from './auth-users.constant';
import { lectures } from './lectures.constants';

export const attendances: IAttendance[] = [
  // Student@example.com
  {
    attendanceId: 'e025993c-10d4-4114-93d3-44049e4d9c98',
    authUser: authUsers[0],
    lecture: lectures[0],
    createdAt: new Date('2022-04-25 08:26:00.000000'),
    updatedAt: new Date('2022-04-25 08:26:00.000000'),
  },
  {
    attendanceId: 'c44426f2-5582-4da7-bc3c-611a88957799',
    authUser: authUsers[0],
    lecture: lectures[1],
    createdAt: new Date('2022-04-25 10:27:00.000000'),
    updatedAt: new Date('2022-04-25 10:27:00.000000'),
  },
  {
    attendanceId: '6c645a39-93b0-46b5-9125-68e587657ae2',
    authUser: authUsers[0],
    lecture: lectures[2],
    createdAt: new Date('2022-04-26 08:22:00.000000'),
    updatedAt: new Date('2022-04-26 08:22:00.000000'),
  },
  {
    attendanceId: 'a5de8275-2104-4b8f-bf01-37da0352b831',
    authUser: authUsers[0],
    lecture: lectures[3],
    createdAt: new Date('2022-04-26 10:25:00.000000'),
    updatedAt: new Date('2022-04-26 10:25:00.000000'),
  },
  {
    attendanceId: '6a0602ee-1131-436f-8666-f29927602af5',
    authUser: authUsers[0],
    lecture: lectures[4],
    createdAt: new Date('2022-04-28 08:26:00.000000'),
    updatedAt: new Date('2022-04-28 08:26:00.000000'),
  },
  {
    attendanceId: '2258ea5a-6be4-494d-baff-8b091f203a45',
    authUser: authUsers[0],
    lecture: lectures[5],
    createdAt: new Date('2022-04-28 10:19:00.000000'),
    updatedAt: new Date('2022-04-28 10:19:00.000000'),
  },
  {
    attendanceId: 'a033bb13-6a9f-4d57-a83f-c0b9b470ecb1',
    authUser: authUsers[0],
    lecture: lectures[6],
    createdAt: new Date('2022-05-03 08:26:00.000000'),
    updatedAt: new Date('2022-05-03 08:26:00.000000'),
  },
  // Student2@example.com
  {
    attendanceId: '878640a6-0648-4023-9af0-53a1a7f8111e',
    authUser: authUsers[1],
    lecture: lectures[0],
    createdAt: new Date('2022-04-25 08:21:00.000000'),
    updatedAt: new Date('2022-04-25 08:21:00.000000'),
  },
  {
    attendanceId: '14e732f9-d4c1-4864-bc2c-5dd901167ed7',
    authUser: authUsers[1],
    lecture: lectures[1],
    createdAt: new Date('2022-04-25 10:23:00.000000'),
    updatedAt: new Date('2022-04-25 10:23:00.000000'),
  },
  {
    attendanceId: 'b70f640c-0203-4844-a342-a9886c0ec6df',
    authUser: authUsers[1],
    lecture: lectures[3],
    createdAt: new Date('2022-04-26 10:21:00.000000'),
    updatedAt: new Date('2022-04-26 10:21:00.000000'),
  },
  {
    attendanceId: '2ecb5003-589f-40ab-aaef-6f6caf720e47',
    authUser: authUsers[1],
    lecture: lectures[8],
    createdAt: new Date('2022-05-04 08:13:30.000000'),
    updatedAt: new Date('2022-05-04 08:13:30.000000'),
  },
  {
    attendanceId: '562994ca-5bcf-4342-a052-e71f9dd55ab5',
    authUser: authUsers[1],
    lecture: lectures[9],
    createdAt: new Date('2022-05-04 10:30:00.000000'),
    updatedAt: new Date('2022-05-04 10:30:00.000000'),
  },
  // Student3@example.com
  {
    attendanceId: '0daacc9e-aebd-466a-8d6d-e7e9fed80aeb',
    authUser: authUsers[2],
    lecture: lectures[3],
    createdAt: new Date('2022-04-26 10:17:20.000000'),
    updatedAt: new Date('2022-04-26 10:17:20.000000'),
  },
  {
    attendanceId: 'adab5fbc-ae62-4857-835c-e581ead71a2c',
    authUser: authUsers[2],
    lecture: lectures[4],
    createdAt: new Date('2022-04-28 08:16:10.000000'),
    updatedAt: new Date('2022-04-28 08:16:10.000000'),
  },
  {
    attendanceId: '20dd0f5b-aebd-4e0e-943f-377a3a503fbc',
    authUser: authUsers[2],
    lecture: lectures[5],
    createdAt: new Date('2022-04-28 10:17:15.000000'),
    updatedAt: new Date('2022-04-28 10:17:15.000000'),
  },
  {
    attendanceId: '200545af-6a27-4482-a067-a1b654c1fa2f',
    authUser: authUsers[2],
    lecture: lectures[6],
    createdAt: new Date('2022-05-03 08:28:19.000000'),
    updatedAt: new Date('2022-05-03 08:28:19.000000'),
  },
  {
    attendanceId: '0f16c27a-02d1-46cc-9cdf-c10ca92ec11e',
    authUser: authUsers[2],
    lecture: lectures[8],
    createdAt: new Date('2022-05-04 08:14:30.000000'),
    updatedAt: new Date('2022-05-04 08:14:30.000000'),
  },
  {
    attendanceId: 'da7e1891-8cd8-4535-b676-21c3cb1017a1',
    authUser: authUsers[2],
    lecture: lectures[9],
    createdAt: new Date('2022-05-04 10:27:00.000000'),
    updatedAt: new Date('2022-05-04 10:27:00.000000'),
  },
];
