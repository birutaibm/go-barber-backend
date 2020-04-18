import { isEqual } from 'date-fns';
import Appointment from "../models/Appointment";

interface AppointmentCreationDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public createAppointment(appointmentData: AppointmentCreationDTO) {
    const appointment = new Appointment(appointmentData);
    this.appointments.push(appointment);
    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const found = this.appointments.find(appointment => isEqual(date, appointment.date));
    return found ? {...found} : null;
  }

  public listAll() {
    return [...this.appointments];
  }
}

export default AppointmentsRepository;
