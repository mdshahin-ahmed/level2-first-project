import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/app.error';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // {email: {$regex: query.searchTem,$options:i}}
  // {presentAddress: {$regex: query.searchTem,$options:i}}
  // {'name.firstName': {$regex: query.searchTem,$options:i}}

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const result = await Student.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*

  guardian:{
    fatherOccupation:"Teacher"
  }

  guardian.fatherOccupation:"Teacher"

  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (await Student.isUserExists(id)) {
      const deleteStudent = await Student.findOneAndUpdate(
        { id },
        { isDeleted: true },
        { new: true, session },
      );
      if (!deleteStudent) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted student');
      }
      const deletedUser = await User.findOneAndUpdate(
        { id },
        { isDeleted: true },
        { new: true, session },
      );
      if (!deletedUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted user');
      }
      session.commitTransaction();
      session.endSession();

      return deleteStudent;
    } else {
      throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
    }
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Something is wrong');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
