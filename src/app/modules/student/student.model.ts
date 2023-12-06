import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

// create schema

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required!'],
    trim: true, // removed space
    maxlength: [20, 'First name can not be allowed more then 20 characters'],
    // custom validation
    // validate: {
    //   validator: function (value: string) {
    //     // we can revive value here as value
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in capitalize formate',
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required!'],

    // third party validation -> validator
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
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

const localGuardianSchema = new Schema<TLocalGuardian>({
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

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'id is required'], unique: true }, // for unique we can't insert duplicate data
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: { type: userNameSchema, required: true },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid', // {VALUE} we can get the value that user given
      },
      required: true,
    }, // enum type
    dataOfBirth: { type: Date },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required!'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email',
      },
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
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name?.middleName +
    ' ' +
    this?.name?.lastName
  );
});

// query middleware

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// [ { '$match': { id: '123456789' } } ]
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};

// creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id: id });
//   return existingUser;
// };

// Create model
export const Student = model<TStudent, StudentModel>('Student', studentSchema); // 'Student' DB collection name
