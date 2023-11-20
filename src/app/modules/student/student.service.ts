import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result; // it will go inside controller
};

export const StudentServices = {
  createStudentIntoDB,
};
