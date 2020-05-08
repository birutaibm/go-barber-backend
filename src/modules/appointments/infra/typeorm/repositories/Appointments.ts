import { getRepository } from 'typeorm';

import Appointment from '../entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository = getRepository(Appointment);

  getAll(): Promise<Appointment[]> {
    return this.ormRepository.find();
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const found = await this.ormRepository.findOne({
      where: { date },
    });

    return found;
  }

  async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create(data);
    return await this.ormRepository.save(appointment);
  }
}

export default AppointmentsRepository;
