import express from 'express';
import userRouter from '../modules/users/user.route';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.router';
import { DepartmentRoutes } from '../modules/academicDepartment/academicDepartment.router';
import { StudentRoutes } from '../modules/student/student.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/academic-semesters',
    route: SemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: DepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
// router.use('/users', userRouter);
// router.use('/academic-semesters', SemesterRoutes);

export default router;
