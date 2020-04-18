import { startOfHour } from 'date-fns';

import Repository from "../repositories/Appointments";

interface AppointmentCreationDTO {
  provider: string;
  date: Date;
}

class AppointmentCreator {
  appointmentsRepo: Repository;

  constructor(appointmentsRepository: Repository) {
    this.appointmentsRepo = appointmentsRepository;
  }

  public execute({ provider, date }: AppointmentCreationDTO) {
    const roundedDate = startOfHour(date);
    const conflictingAppointment = this.appointmentsRepo.findByDate(roundedDate);

    if (conflictingAppointment) {
      throw Error('This date is already booked.');
    }

    return this.appointmentsRepo.createAppointment({ provider, date: roundedDate });
  }
}

export default AppointmentCreator;
