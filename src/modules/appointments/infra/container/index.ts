import container from '@shared/container';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '../typeorm/repositories/Appointments';

container.registry<IAppointmentsRepository>('AppointmentsRepository', () => new AppointmentsRepository());

export default container;
