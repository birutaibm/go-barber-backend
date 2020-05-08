import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/Appointments';
import AppointmentCreator from '@modules/appointments/services/AppointmentCreator';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const router = Router();

router.use(ensureAuthenticated);

router.get('/', async (request, response) => {
  const repository = new AppointmentsRepository();
  const appointments = await repository.getAll();
  return response.json(appointments);
});

router.post('/', async (request, response) => {
  const { provider, date } = request.body;
  const creator = new AppointmentCreator(new AppointmentsRepository());
  const appointments = await creator.execute({
    provider,
    date: parseISO(date),
  });

  return response.status(201).json(appointments);
});

export default router;
