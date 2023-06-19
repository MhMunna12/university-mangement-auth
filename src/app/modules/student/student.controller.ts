import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IStudent } from './student.interface';
import pick from '../../../shared/pick';
import catchAsync from '../../../shared/catchAsync';
import { paginationFields } from '../../constant/pagination';
import { studentFilterableFields } from './student.constant';
import { Request, Response } from 'express';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

export const StudentController = {
  getAllStudents,
};
