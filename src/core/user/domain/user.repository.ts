import type { User } from "./user.model";

export interface UserRepository {
  getAll(): Promise<User[]>;
}
