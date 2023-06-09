import {
  IAcademicSemesterCode,
  IAcademicSemesterMonths,
  IAcademicSemesterTitle,
} from './academicSemesterInterface';

export const academicSemesterTitles: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemesterCodes: IAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
];
export const academicSemesterMonths: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
export const academicSemesterSearchableFields = ['title', 'code', 'year'];
