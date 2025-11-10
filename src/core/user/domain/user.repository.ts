import type { User } from "./user.model";

export interface UserRepository {
  getAll(): Promise<User[]>;
  byId(userId: string): Promise<User | null>;
}
