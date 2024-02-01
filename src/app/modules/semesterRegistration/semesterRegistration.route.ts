import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import { semesterRegistrationController } from './semesterRegistration.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.post(
  '/create-semester-registration',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  semesterRegistrationController.getAllSemesterRegistration,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    semesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.updateSemesterRegistration,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  semesterRegistrationController.getSingleSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
