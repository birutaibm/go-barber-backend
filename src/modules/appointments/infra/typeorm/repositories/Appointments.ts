import { getRepository, Raw } from 'typeorm';

import Appointment from '../entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository = getRepository(Appointment);

  public async findAllInMonthFromProvider({
    provider_id, month, year
  }: IFindAllInMonthFromProviderDTO) {
    const parseMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parseMonth}-${year}'`
        ),
      }
    });
    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id, day, month, year
  }: IFindAllInDayFromProviderDTO) {
    const parseDay = String(day).padStart(2, '0');
    const parseMonth = String(month).padStart(2, '0');
    const parseDate = `'${parseDay}-${parseMonth}-${year}'`
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'DD-MM-YYYY') = ${parseDate}`
        ),
      },
      relations: ['user'],
    });
    return appointments;
  }

  public getAll() {
    return this.ormRepository.find();
  }

  public async findByDate(date: Date, provider_id: string) {
    const found = await this.ormRepository.findOne({
      where: { date, provider_id },
    });

    return found;
  }

  public async create(data: ICreateAppointmentDTO) {
    const appointment = this.ormRepository.create(data);
    return await this.ormRepository.save(appointment);
  }
}

export default AppointmentsRepository;
