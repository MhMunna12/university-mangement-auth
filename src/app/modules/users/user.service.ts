// import { Request, Response } from "express";
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/apiErrors';
import { AcademicSemester } from '../academicSemester/academicSemesterModel';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './users.util';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  //default
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  //set role

  user.role = 'student';
  console.log('user', student);
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );
  console.log('from service', academicSemester);

  //auto generated incremental id
  let newUserAllData = null;
  const session = mongoose.startSession();
  try {
    (await session).startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    //array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //set student -->  _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    (await session).commitTransaction();
    (await session).endSession();
  } catch (error) {
    (await session).abortTransaction();
    (await session).endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};
export default {
  createStudent,
};
