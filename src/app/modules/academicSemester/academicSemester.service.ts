import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/app.error';
import {
  AcademicSemesterSearchableFields,
  academicSemesterNameCodeMapper,
} from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // academicSemesterNameCodeMapper['Fall'] = 03
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(400, 'Invalid semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDB = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(AcademicSemesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicSemesterQuery.modelQuery;
  const meta = await academicSemesterQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleAcademicSemesterFromDB = async (semesterId: string) => {
  const result = await AcademicSemester.findOne({ _id: semesterId });
  return result;
};
const updateAcademicSemesterIntoDB = async (
  semesterId: string,
  payload: TAcademicSemester,
) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(400, 'Invalid semester code');
  }
  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: semesterId },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
