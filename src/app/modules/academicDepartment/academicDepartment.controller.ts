import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic department is created successfully!',
      data: result,
    });
  },
);

const getAllAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await AcademicDepartmentServices.getAllAcademicDepartmentFromDB(
        req.query,
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Fetched all academic department successfully!',
      meta: result.meta,
      data: result.result,
    });
  },
);

const getSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { departmentId } = req.params;
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
        departmentId,
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Fetched academic department successfully!',
      data: result,
    });
  },
);
const updateAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { departmentId } = req.params;
    const result =
      await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
        departmentId,
        req.body,
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'updated academic department successfully!',
      data: result,
    });
  },
);

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
