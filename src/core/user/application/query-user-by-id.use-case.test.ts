import { userModelMock } from "../domain/user.model.mock";
import type { UserRepository } from "../domain/user.repository";
import { QueryUserByIdUseCase } from "./query-user-by-id.use-case";

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
  getAll: vi.fn(),
  byId: vi.fn().mockResolvedValue(userModelMock),
};

describe("QueryUserByIdUseCase", () => {
  it("should retrieve a user by ID", async () => {
    const userId = "1";
    const result = await new QueryUserByIdUseCase(mockUserRepository).execute(
      userId
    );
    expect(mockUserRepository.byId).toHaveBeenCalled();
    expect(result).toEqual(userModelMock);
  });
});
