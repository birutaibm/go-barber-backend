import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import Appointment from "../infra/typeorm/entities/Appointment";
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface Input {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

export default class ProviderAppointmentsGetter {
  constructor (
    private repository: IAppointmentsRepository,
    private cache: ICacheProvider
  ) {}

  public async execute(data: Input): Promise<Appointment[]> {
    const key = `provider-appointments:${data.provider_id}:${data.year}:${data.month}:${data.day}`;
    let appointments = await this.cache.recover<Appointment[]>(key);
    if (!appointments) {
      appointments = await this.repository.findAllInDayFromProvider(data);
      this.cache.save<Appointment[]>(key, appointments);
    }

    return appointments;
  }
}
