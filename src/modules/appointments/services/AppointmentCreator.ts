import { startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import Repository from '../repositories/IAppointmentsRepository';

interface AppointmentCreationDTO {
  provider: string;
  date: Date;
}

class AppointmentCreator {
  constructor(private appointmentsRepo: Repository) {}

  public async execute({
    provider,
    date,
  }: AppointmentCreationDTO): Promise<Appointment> {
    const roundedDate = startOfHour(date);
    const conflictingAppointment = await this.appointmentsRepo.findByDate(
      roundedDate,
    );

    if (conflictingAppointment) {
      throw new AppError('This date is already booked.');
    }

    return await this.appointmentsRepo.create({
      // eslint-disable-next-line @typescript-eslint/camelcase
      provider_id: provider,
      date: roundedDate,
    });
  }
}

export default AppointmentCreator;
