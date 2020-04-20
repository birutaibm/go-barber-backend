import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/Appointments';
import AppointmentCreator from '../services/AppointmentCreator';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const router = Router();

router.use(ensureAuthenticated);

router.get('/', async (request, response) => {
  const repository = getCustomRepository(AppointmentsRepository);
  const appointments = await repository.find();
  return response.json(appointments);
});

router.post('/', async (request, response) => {
  const { provider, date } = request.body;
  const creator = new AppointmentCreator();
  const appointments = await creator.execute({
    provider,
    date: parseISO(date),
  });

  return response.status(201).json(appointments);
});

export default router;
