import httpStatus from 'http-status';
import AppError from '../../errors/app.error';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../Faculty/faculty.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }

  const academicSemester = isSemesterRegistrationExist.academicSemester;

  const isAcademicFacultyExist =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found');
  }

  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found');
  }

  const isCourseExist = await Course.findById(course);

  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  const isFacultyExist = await Faculty.findById(faculty);

  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  // check if the semester registration id is exist!
  const result = await OfferedCourse.create({ ...payload, academicSemester });

  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  // const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
  //   .filter()
  //   .sort()
  //   .paginate()
  //   .fields();
  // const result = await offeredCourseQuery.modelQuery;
  // return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  // const offeredCourse = await OfferedCourse.findById(id);
  // if (!offeredCourse) {
  //   throw new AppError(404, 'Offered Course not found');
  // }
  // return offeredCourse;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the faculty exists
   * Step 3: check if the semester registration status is upcoming
   * Step 4: check if the faculty is available at that time. If not then throw error
   * Step 5: update the offered course
   */
  // const { faculty, days, startTime, endTime } = payload;
  // const isOfferedCourseExists = await OfferedCourse.findById(id);
  // if (!isOfferedCourseExists) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
  // }
  // const isFacultyExists = await Faculty.findById(faculty);
  // if (!isFacultyExists) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  // }
  // const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  // // get the schedules of the faculties
  // // Checking the status of the semester registration
  // const semesterRegistrationStatus =
  //   await SemesterRegistration.findById(semesterRegistration);
  // if (semesterRegistrationStatus?.status !== 'UPCOMING') {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
  //   );
  // }
  // // check if the faculty is available at that time.
  // const assignedSchedules = await OfferedCourse.find({
  //   semesterRegistration,
  //   faculty,
  //   days: { $in: days },
  // }).select('days startTime endTime');
  // const newSchedule = {
  //   days,
  //   startTime,
  //   endTime,
  // };
  // if (hasTimeConflict(assignedSchedules, newSchedule)) {
  //   throw new AppError(
  //     httpStatus.CONFLICT,
  //     `This faculty is not available at that time ! Choose other time or day`,
  //   );
  // }
  // const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
  //   new: true,
  // });
  // return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  // const isOfferedCourseExists = await OfferedCourse.findById(id);
  // if (!isOfferedCourseExists) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
  // }
  // const semesterRegistation = isOfferedCourseExists.semesterRegistration;
  // const semesterRegistrationStatus =
  //   await SemesterRegistration.findById(semesterRegistation).select('status');
  // if (semesterRegistrationStatus?.status !== 'UPCOMING') {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
  //   );
  // }
  // const result = await OfferedCourse.findByIdAndDelete(id);
  // return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
