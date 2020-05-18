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
    const appointments = await this.repository.findAllInDayFromProvider(data);
    const key = `Appointments-${data.provider_id}-${data.day}/${data.month}/${data.year}`;
    this.cache.save(key, JSON.stringify(appointments));
    return appointments;
  }
}
