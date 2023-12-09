import express from 'express';
import { UsersControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidation } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UsersControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(facultyValidation.createFacultyValidationSchema),
  UsersControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UsersControllers.createAdmin,
);

export const UserRoutes = router;
