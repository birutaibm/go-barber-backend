import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Repository from '../repositories/Appointments';
import Appointment from '../models/Appointment';

interface AppointmentCreationDTO {
  provider: string;
  date: Date;
}

class AppointmentCreator {
  appointmentsRepo: Repository;

  constructor() {
    this.appointmentsRepo = getCustomRepository(Repository);
  }

  public async execute({
    provider,
    date,
  }: AppointmentCreationDTO): Promise<Appointment> {
    const roundedDate = startOfHour(date);
    const conflictingAppointment = await this.appointmentsRepo.findByDate(
      roundedDate,
    );

    if (conflictingAppointment) {
      throw Error('This date is already booked.');
    }

    const appointment = this.appointmentsRepo.create({
      // eslint-disable-next-line @typescript-eslint/camelcase
      provider_id: provider,
      date: roundedDate,
    });
    await this.appointmentsRepo.save(appointment);
    return appointment;
  }
}

export default AppointmentCreator;
