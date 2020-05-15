import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AppointmentsCtrl from '../controllers/AppointmentsCtrl';
import ProviderAppointmentsCtrl from '../controllers/ProviderAppointmentsCtrl';

const router = Router();
const appointments = new AppointmentsCtrl();
const providerAppointments = new ProviderAppointmentsCtrl();

router.use(ensureAuthenticated);

router.get('/', appointments.index);
router.post('/', appointments.create);
router.get('/me', providerAppointments.index);

export default router;
