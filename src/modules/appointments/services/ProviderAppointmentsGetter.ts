import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import Appointment from "../infra/typeorm/entities/Appointment";

interface Input {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

export default class ProviderAppointmentsGetter {
  constructor (
    private repository: IAppointmentsRepository
  ) {}

  public async execute(data: Input): Promise<Appointment[]> {
    return await this.repository.findAllInDayFromProvider(data);
  }
}
