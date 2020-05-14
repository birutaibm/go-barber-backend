import User from "../infra/typeorm/entities/User";
import ICreateUserDTO from "../dtos/IUserCreationDTO";

export interface FindAllProvidersInputDTO {
  except_user_id?: string;
}

export default interface IUsersRepository {
  findAllProviders(data: FindAllProvidersInputDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
