import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear } from 'date-fns';

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IAppointmentsRepository from "../IAppointmentsRepository";
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

export default class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const result = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    );
    return new Promise(resolve => resolve(result));
  }

  getAll(): Promise<Appointment[]> {
    return new Promise(resolve => resolve(this.appointments));
  }

  findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date)
    );
    return new Promise(resolve => resolve(findAppointment));
  }

  create({date, provider_id, user_id}: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), date, provider_id, user_id});
    this.appointments.push(appointment);
    return new Promise(resolve => resolve(appointment));
  }
};
