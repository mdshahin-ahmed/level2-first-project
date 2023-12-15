import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import { semesterRegistrationController } from './semesterRegistration.controller';
const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
);

router.get('/', semesterRegistrationController.getAllSemesterRegistration);

router.patch('/:id', semesterRegistrationController.updateSemesterRegistration);

router.get(
  '/:id',
  semesterRegistrationController.getSingleSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
