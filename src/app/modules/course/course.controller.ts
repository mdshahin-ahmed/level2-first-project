import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course is created successfully!',
    data: result,
  });
});

const getAllCourses: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course are faculties successfully!',
    data: result,
  });
});

const getSingleCourses: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fetched course  successfully!',
    data: result,
  });
});

const updateCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'updated course successfully!',
    data: result,
  });
});

const assignFacultiesWithCourse: RequestHandler = catchAsync(
  async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.assignFacultiesIntoWithCourseIntoDB(
      courseId,
      faculties,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculties assign successfully!',
      data: result,
    });
  },
);
const getFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.getFacultiesWithCourseFromDB(courseId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculties retrieved successfully!',
    data: result,
  });
});

const removeFacultiesFromCourse: RequestHandler = catchAsync(
  async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.removeFacultiesFromCourseFromDB(
      courseId,
      faculties,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculties removed successfully!',
      data: result,
    });
  },
);

const deleteCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Deleted course successfully!',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourses,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
  getFacultiesWithCourse,
};
