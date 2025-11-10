import type { User } from "../domain/user.model";
import type { UserRepository } from "../domain/user.repository";
import type { UserDTO } from "./user.dto";

export class UserRestRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/");
    const usersData = await response.json();

    return usersData.map((userData: UserDTO) => ({
      id: String(userData.id),
      name: userData.name,
      email: userData.email,
      city: userData.address.city,
      website: userData.website,
      company: userData.company?.name,
      albumIds: [],
      todoListIds: [],
    }));
  }

  async byId(userId: string): Promise<User | null> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );

    if (response.status === 404) {
      return null;
    }

    const userData: UserDTO = await response.json();

    return {
      id: String(userData.id),
      name: userData.name,
      email: userData.email,
      city: userData.address.city,
      website: userData.website,
      company: userData.company?.name,
      albumIds: [],
      todoListIds: [],
    };
  }
}
