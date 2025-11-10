import type { UserRepository } from "../domain/user.repository";

export class QueryUserByIdUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId: string) {
    return this.userRepository.byId(userId);
  }
}
