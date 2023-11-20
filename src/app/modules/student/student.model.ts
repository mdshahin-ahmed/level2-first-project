import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

// create schema

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required!'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required!'],
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, 'Father name is required!'] },
  fatherOccupation: {
    type: String,
    required: [true, 'First Occupation is required!'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact number is required!'],
  },
  motherName: { type: String, required: [true, 'Mother name is required!'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required!'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required!'],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, 'Local guardian name is required!'] },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required!'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required!'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required!'],
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true }, // for unique we can't insert duplicate data
  name: { type: userNameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid', // {VALUE} we can get the value that user given
    },
    required: true,
  }, // enum type
  dataOfBirth: { type: String },
  email: { type: String, required: [true, 'Email is required!'], unique: true },
  contactNo: { type: String, required: [true, 'Contact number is required!'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required!'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required!'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required!'],
  },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

// Create model

export const StudentModel = model<Student>('Student', studentSchema); // 'Student' DB collection name
