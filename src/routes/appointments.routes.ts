import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/Appointments';
import AppointmentCreator from '../services/CreateAppointment';

const router = Router();
const repository = new AppointmentsRepository();
const creator = new AppointmentCreator(repository);

router.get('/', (request, response) => {
  return response.json(repository.listAll());
});

router.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    return response
      .status(201)
      .json(creator.execute({ provider, date: parseISO(date) }));
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

export default router;
