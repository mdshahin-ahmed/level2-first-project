import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/app.error';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password  not given, use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // start session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (!admissionSemester) {
      throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found.');
    }

    // set generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction -> 1)
    const newUser = await User.create([userData], { session }); // need to pass array
    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id, and _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // create a student (transaction -> 2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    session.commitTransaction();
    session.endSession();

    return newStudent;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Something is wrong');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
