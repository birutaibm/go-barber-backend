import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import { getDate, getDaysInMonth, getHours, isAfter } from "date-fns";
import Appointment from "../infra/typeorm/entities/Appointment";

interface Input {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

interface OutputElement {
  hour: number;
  available: boolean;
}

type Output = OutputElement[];

export default class DayAvailabilityGetter {
  constructor (
    private repository: IAppointmentsRepository
  ) {}

  public async execute({ provider_id, day, month, year }: Input): Promise<Output> {
    const appointments = await this.repository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year
    });
    const unavailableHours = appointments
      .map(appointment => getHours(appointment.date));
    const hoursInDays = Array.from(
      { length: 10 },
      (_, index) => index + 8
    );
    const currentDate = new Date(Date.now());

    return hoursInDays.map(hour => {
      const date = new Date(year, month - 1, day, hour);
      const available =
        !unavailableHours.includes(hour) &&
        isAfter(date, currentDate);
      return { hour, available };
    });
  }
}
