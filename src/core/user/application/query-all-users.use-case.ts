import type { UserRepository } from "../domain/user.repository";

export class QueryAllUsersUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    return this.userRepository.getAll();
  }
}
