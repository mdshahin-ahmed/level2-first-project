import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createSemesterRegistration = catchAsync(async (req, res) => {
  // const { id } = req.params;
  // const result = await semesterRegistrationServices.getSingleFacultyFromDB( id );
  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'Faculty is retrieved succesfully',
  //   data: result,
  // });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
  // const { id } = req.params;
  // const result = await semesterRegistrationServices.getSingleFacultyFromDB( id );
  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'Faculty is retrieved succesfully',
  //   data: result,
  // });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  // const { id } = req.params;
  // const result = await semesterRegistrationServices.getSingleFacultyFromDB( id );
  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'Faculty is retrieved succesfully',
  //   data: result,
  // });
});
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  // const { id } = req.params;
  // const result = await semesterRegistrationServices.getSingleFacultyFromDB( id );
  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'Faculty is retrieved succesfully',
  //   data: result,
  // });
});

export const semesterRegistrationController = {
  createSemesterRegistration,
  updateSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
};
