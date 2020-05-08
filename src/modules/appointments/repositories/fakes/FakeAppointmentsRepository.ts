import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IAppointmentsRepository from "../IAppointmentsRepository";

export default class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  getAll(): Promise<Appointment[]> {
    return new Promise(resolve => resolve(this.appointments));
  }

  findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date)
    );
    return new Promise(resolve => resolve(findAppointment));
  }

  create({date, provider_id}: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), date, provider_id});
    this.appointments.push(appointment);
    return new Promise(resolve => resolve(appointment));
  }
};
