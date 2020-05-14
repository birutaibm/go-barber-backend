import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import { getDate, getDaysInMonth, isAfter } from "date-fns";
import Appointment from "../infra/typeorm/entities/Appointment";

interface Input {
  provider_id: string;
  month: number;
  year: number;
}

interface OutputElement {
  day: number;
  available: boolean;
}

type Output = OutputElement[];

export default class MonthAvailabilityGetter {
  constructor (
    private repository: IAppointmentsRepository
  ) {}

  public async execute({ provider_id, month, year }: Input): Promise<Output> {
    const appointments = await this.repository.findAllInMonthFromProvider({
      provider_id,
      month,
      year
    });
    const appointmentsByDay = appointments.reduce(
      (group: Array<Appointment[]>, appointment) => {
        const index = getDate(appointment.date);
        const values = group[index] || [];
        values.push(appointment);
        group[index] = values;
        return group;
      },
      []
    );
    const daysInMonth = Array.from(
      { length: getDaysInMonth(new Date(year, month - 1)) },
      (_, index) => index + 1
    );
    const currentDate = new Date(Date.now());

    return daysInMonth.map(day => {
      const date = new Date(year, month - 1, day);
      if (isAfter(currentDate, date)) return { day, available: false };

      const appointments = appointmentsByDay[day] || [];
      const available = appointments.length < 10;
      return { day, available };
    });
  }
}
