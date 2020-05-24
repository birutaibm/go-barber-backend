import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AppointmentsCtrl from '../controllers/AppointmentsCtrl';
import ProviderAppointmentsCtrl from '../controllers/ProviderAppointmentsCtrl';

const router = Router();
const appointments = new AppointmentsCtrl();
const providerAppointments = new ProviderAppointmentsCtrl();

router.use(ensureAuthenticated);

router.get('/', appointments.index);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointments.create
);

router.get('/me', providerAppointments.index);

export default router;
