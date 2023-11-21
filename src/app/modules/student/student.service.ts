import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('Student already exists');
  }
  const result = await Student.create(studentData); // built in static method

  // build in instance method
  // const student = new Student(studentData); // create on interface

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('Student already exists');
  // }

  // const result = await student.save(); // build in instance method

  return result; // it will go inside controller
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
