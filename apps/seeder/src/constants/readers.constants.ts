import { IReader, ReaderStatus } from '@student-hive/interfaces';
import { classrooms } from './classrooms.constants';

export const readers: IReader[] = [
  {
    readerId: '9aa727a7-85f7-46e7-81e6-39102e5e7f37',
    mac: 'a2:e0:87:fd:a2:3a',
    status: ReaderStatus.connected,
    isEnabled: true,
    classroom: classrooms[0],
  },
  {
    readerId: '6be1093b-2cc4-40c4-ac1a-640b0954fb99',
    mac: 'b1:eb:c0:26:85:0a',
    status: ReaderStatus.connected,
    isEnabled: true,
    classroom: classrooms[1],
  },
  {
    readerId: '909caa40-5571-47c6-a338-0cfdcf199ddf',
    mac: '42:32:07:fb:fa:a4',
    status: ReaderStatus.connected,
    isEnabled: true,
    classroom: classrooms[2],
  },
  {
    readerId: '1c69b074-d6b7-4663-ab9a-6d864f9dd6dd',
    mac: 'ba:34:c5:5e:c6:16',
    status: ReaderStatus.connected,
    isEnabled: true,
    classroom: classrooms[3],
  },
  {
    readerId: 'a4a7aa5d-fe82-4d8e-9f26-5387c5aabbac',
    mac: '6e:4f:24:1c:dd:ac',
    status: ReaderStatus.connected,
    isEnabled: true,
    classroom: classrooms[4],
  },
];
