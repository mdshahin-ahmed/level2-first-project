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
    trim: true, // removed space
    maxlength: [20, 'First name can not be allowed more then 20 characters'],
    // custom validation
    validate: {
      validator: function (value: string) {
        // we can revive value here as value
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize formate',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required!'],
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father name is required!'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'First Occupation is required!'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father Contact number is required!'],
  },
  motherName: { type: String, required: [true, 'Mother name is required!'] },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother occupation is required!'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Mother contact number is required!'],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Local guardian name is required!'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Local guardian occupation is required!'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Local guardian contact number is required!'],
  },
  address: {
    type: String,
    trim: true,
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
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required!'],
    unique: true,
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Contact number is required!'],
  },
  emergencyContactNo: {
    type: String,
    trim: true,
    required: [true, 'Emergency contact number is required!'],
  },
  bloodGroup: {
    type: String,
    trim: true,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  presentAddress: {
    type: String,
    trim: true,
    required: [true, 'Present address is required!'],
  },
  permanentAddress: {
    type: String,
    trim: true,
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
