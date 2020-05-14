import { startOfHour, isBefore, isAfter } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import Repository from '../repositories/IAppointmentsRepository';

interface AppointmentCreationDTO {
  provider: string;
  user_id: string;
  date: Date;
}

class AppointmentCreator {
  constructor(private appointmentsRepo: Repository) {}

  public async execute({
    user_id,
    provider,
    date,
  }: AppointmentCreationDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const startOfDay = new Date(appointmentDate).setHours(8);
    const endOfDay = new Date(appointmentDate).setHours(17);

    if (isBefore(appointmentDate, startOfDay)) {
      throw new AppError('You can not create an appointment earlier than 8:00')
    }

    if (isAfter(appointmentDate, endOfDay)) {
      throw new AppError('You can not create an appointment latter than 17:00')
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can not create an appointment on a past date')
    }

    if (user_id === provider) {
      throw new AppError('You can not create an appointment with yourself')
    }

    const conflictingAppointment = await this.appointmentsRepo.findByDate(
      appointmentDate,
    );

    if (conflictingAppointment) {
      throw new AppError('This date is already booked.');
    }

    return await this.appointmentsRepo.create({
      // eslint-disable-next-line @typescript-eslint/camelcase
      provider_id: provider,
      user_id,
      date: appointmentDate,
    });
  }
}

export default AppointmentCreator;
