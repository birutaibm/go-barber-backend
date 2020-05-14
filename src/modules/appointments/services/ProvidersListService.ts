import IUsersRepository from "@modules/users/repositories/IUsersRepository";

export default class ProvidersListService {
  constructor(private repository: IUsersRepository) {}

  public async execute (user_id: string) {
    return this.repository.findAllProviders({
      except_user_id: user_id
    });
  }
}
