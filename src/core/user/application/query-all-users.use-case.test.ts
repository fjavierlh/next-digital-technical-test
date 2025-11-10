import { userModelMock } from "../domain/user.model.mock";
import type { UserRepository } from "../domain/user.repository";
import { QueryAllUsersUseCase } from "./query-all-users.use-case";

export type User = {
  id: string;
  name: string;
  email: string;
  city: string;
  website?: string;
  company?: string;
  albumIds: number[];
  todoListIds: number[];
};

const mockUserRepository: UserRepository = {
  getAll: vi.fn().mockResolvedValue([userModelMock]),
};

describe("QueryAllUsersUseCase", () => {
  it("should retrieve all users from the repository", async () => {
    const result = await new QueryAllUsersUseCase(mockUserRepository).execute();
    expect(mockUserRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual([userModelMock]);
  });
});
